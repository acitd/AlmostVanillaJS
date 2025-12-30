function runHook(el,eventName){
	const attr='on'+eventName;
	if(typeof el[attr]==='function')
		el[attr](el);
	else{
		const code=el.getAttribute(attr);
		if(code){
			try{
				el[attr]=new Function(code);
				el[attr](el);
			}
			catch(error){
				console.error('Error compiling '+attr+' attribute: ',error);
			}
		}
	}
	try{
		el.dispatchEvent(new CustomEvent(eventName,{
			bubbles:false,
			cancelable:false,
			detail:{element:el}
		}));
	}
	catch(error){
		console.error('Error dispatching '+eventName+' event: ',error);
	}
}
let observer=null;

// PUBLIC
export let isMountUnmountStarted=false;
export function startMountUnmount(){
	if(isMountUnmountStarted)
		return;
	isMountUnmountStarted=true;
	globalThis.addEventListener('DOMContentLoaded',()=>{
		if(!isMountUnmountStarted)
			return;
		document.querySelectorAll('*').forEach(el=>runHook(el,'mount'));
		observer=new MutationObserver(mutations=>
			mutations.forEach(mutation=>{
				mutation.addedNodes.forEach(node=>{
					if(node.nodeType===1){
						runHook(node,'mount')
						node.querySelectorAll?.('*').forEach(el=>runHook(el,'mount'));
					}
				});
				mutation.removedNodes.forEach(node=>{
					if(node.nodeType===1){
						[...node.querySelectorAll?.('*')].reverse().forEach(el=>runHook(el,'unmount'));
						runHook(node,'unmount');
					}
				});
			})
		);
		observer.observe(document,{childList:true,subtree:true});
	});
}
export function stopMountUnmount(){
	isMountUnmountStarted=false;
	if(!observer)
		return;
	observer.disconnect();
	observer=null;
}

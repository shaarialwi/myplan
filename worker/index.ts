import * as plans from '../app/api/plans/route';
import * as budget from '../app/api/budget/route';
export default {
 async fetch(req:Request,env:{ASSETS:Fetcher}):Promise<Response>{
  const path=new URL(req.url).pathname;
  if(!path.startsWith('/api/'))return env.ASSETS.fetch(req);
  const routes=path==='/api/plans'?plans:path==='/api/budget'?budget:null;
  if(!routes)return Response.json({error:'Not found'},{status:404});
  const method=req.method as 'GET'|'POST'|'DELETE';
  if(!['GET','POST','DELETE'].includes(method))return Response.json({error:'Method not allowed'},{status:405,headers:{Allow:'GET, POST, DELETE'}});
  try{const response=await routes[method](req);const headers=new Headers(response.headers);headers.set('Cache-Control','no-store');headers.set('X-Content-Type-Options','nosniff');return new Response(response.body,{status:response.status,headers});}
  catch{ return Response.json({error:'Unable to complete this request. Please try again.'},{status:503,headers:{'Cache-Control':'no-store'}}); }
 }
};

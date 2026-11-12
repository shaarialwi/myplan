import {supabaseUrl,supabaseKey} from './auth-config.ts';
// Verification is performed by the project's Auth server, never by decoding alone.
export async function verifyUser(req, fetcher=fetch) {
 const bearer=req.headers.get('authorization');
 if(!bearer || !/^Bearer [^\s]+$/i.test(bearer)) return null;
 const response=await fetcher(supabaseUrl+'/auth/v1/user',{headers:{apikey:supabaseKey,Authorization:bearer},signal:AbortSignal.timeout(10000)});
 if(response.status===401||response.status===403)return null;
 if(!response.ok)throw new Error('Authentication service unavailable');
 const user=await response.json();
 return typeof user.id==='string'&&user.id ? {userId:user.id,email:user.email}:null;
}

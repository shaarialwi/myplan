import {createClient} from '@supabase/supabase-js';
import {supabaseUrl,supabaseKey} from './auth-config';
export const supabase=createClient(supabaseUrl,supabaseKey);
export async function apiFetch(path:string,init:RequestInit={}) {
 const {data:{session}}=await supabase.auth.getSession();
 if(!session)throw new Error('Please sign in again.');
 const headers=new Headers(init.headers);headers.set('Authorization','Bearer '+session.access_token);
 const result=await fetch(path,{...init,headers,cache:'no-store'});
 if(result.status===401){await supabase.auth.signOut({scope:'local'});throw new Error('Your session has expired. Please sign in again.');}
 return result;
}

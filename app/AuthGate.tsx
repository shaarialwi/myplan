import {useEffect,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {supabase} from '../lib/session';
import App from './page';
export default function AuthGate(){
 const [session,setSession]=useState<Session|null>(null),[ready,setReady]=useState(false),[mode,setMode]=useState('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 useEffect(()=>{const {data:{subscription}}=supabase.auth.onAuthStateChange((event,s)=>{setSession(s);setReady(true);if(event==='PASSWORD_RECOVERY')setMode('update');});supabase.auth.getSession().then(({data,error})=>{if(error)setMessage(error.message);setSession(data.session);setReady(true)});return()=>subscription.unsubscribe()},[]);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('');try{
 if(mode==='reset'){const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:location.origin});if(error)throw error;setMessage('If this email has an account, a reset link will arrive shortly.');}
 else if(mode==='update'){const {error}=await supabase.auth.updateUser({password});if(error)throw error;setMode('login');setPassword('');}
 else if(mode==='signup'){const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:location.origin}});if(error)throw error;if(!data.session)setMessage('Check your email to confirm your account, then sign in.');}
 else {const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;setPassword('');}
 }catch(e:any){setMessage(e.message||'Please try again.')}finally{setBusy(false)}}
 if(!ready)return <main><p>Loading Myplan…</p></main>;
 if(session&&mode!=='update')return <><div className="accountBar"><span>{session.user.email}</span><button onClick={async()=>{setBusy(true);const {error}=await supabase.auth.signOut();setBusy(false);if(error)setMessage(error.message)}} disabled={busy}>Sign out</button>{message&&<span role="alert">{message}</span>}</div><App key={session.user.id}/></>;
 return <main className="authWrap"><section className="card authCard"><p className="eyebrow">MYPLAN</p><h1>{mode==='signup'?'Make room for your plans.':mode==='reset'?'Reset your password.':mode==='update'?'Choose a new password.':'Welcome to your space.'}</h1><p className="muted">Your meetings, journeys and spending. Together.</p><form onSubmit={submit}>{mode!=='update'&&<label>Email<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>}{mode!=='reset'&&<label>Password<input type="password" required minLength={mode==='login'?1:8} autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={e=>setPassword(e.target.value)}/></label>}<button className="primary" disabled={busy}>{busy?'Please wait…':mode==='signup'?'Create account':mode==='reset'?'Send reset link':mode==='update'?'Save password':'Sign in'}</button></form>{message&&<p role="status">{message}</p>}{mode!=='update'&&<div className="authLinks">{['login','signup','reset'].filter(x=>x!==mode).map(x=><button key={x} onClick={()=>{setMode(x);setMessage('');setPassword('')}}>{x==='login'?'Sign in':x==='signup'?'Create account':'Forgot password?'}</button>)}</div>}</section></main>
}

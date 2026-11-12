import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyUser} from '../lib/verify-user.mjs';
test('does not trust forged Sites identity headers',async()=>{assert.equal(await verifyUser(new Request('https://myplan.test',{headers:{'oai-authenticated-user-id':'victim','oai-authenticated-user-email':'victim@example.com'}}),()=>{throw Error('must not fetch')}),null)});
test('rejects invalid tokens',async()=>{assert.equal(await verifyUser(new Request('https://myplan.test',{headers:{authorization:'Bearer invalid'}}),async()=>new Response('{}',{status:401})),null)});
test('uses the verified Auth response identity',async()=>{const user=await verifyUser(new Request('https://myplan.test',{headers:{authorization:'Bearer test-token','oai-authenticated-user-id':'victim'}}),async(url,init)=>{assert.equal(url,'https://pcsxiosyudexcyktsxpv.supabase.co/auth/v1/user');assert.equal(init.headers.Authorization,'Bearer test-token');return Response.json({id:'verified-user',email:'user@example.com'})});assert.equal(user.userId,'verified-user')});
test('fails closed on Auth service outage',async()=>{await assert.rejects(verifyUser(new Request('https://myplan.test',{headers:{authorization:'Bearer token'}}),async()=>new Response('',{status:503})))});

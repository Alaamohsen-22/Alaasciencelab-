import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bonds,ionicShells,equations,countAtoms,neutralize} from '../src/science.ts';
test('LiF conserves electrons and charge',()=>{assert.deepEqual(ionicShells('LiF',0,1),{shells:[2],charge:1});assert.deepEqual(ionicShells('LiF',1,1),{shells:[2,8],charge:-1});});
test('Mg transfers one electron to each chlorine sequentially',()=>{assert.deepEqual(ionicShells('MgCl2',1,1),{shells:[2,8,1],charge:1});assert.equal(ionicShells('MgCl2',2,1).charge,0);assert.equal(ionicShells('MgCl2',1,2).charge,2);assert.equal(ionicShells('MgCl2',2,2).charge,-1);const a=[0,1,2].map(i=>ionicShells('MgCl2',i,2));assert.equal(a.reduce((n,a)=>n+a.charge,0),0);assert.equal(a.reduce((n,a)=>n+a.shells.reduce((x,y)=>x+y,0),0),46);});
test('covalent examples require correct shared pairs',()=>assert.deepEqual(bonds.filter(b=>b.type==='covalent').map(b=>b.steps),[1,2,4]));
test('book equations conserve every element',()=>{for(const eq of equations)for(const row of countAtoms(eq,eq.answer))assert.equal(row.left,row.right,eq.name+row.el);assert.ok(countAtoms(equations[1],[1,1,1]).some(r=>r.left!==r.right));});
test('neutralization limits salt and retains excess reagent',()=>{assert.equal(neutralize(0).state,'قاعدي');assert.equal(neutralize(10).state,'متعادل');assert.equal(neutralize(11).state,'حمضي');assert.equal(neutralize(20).salt,.005);});

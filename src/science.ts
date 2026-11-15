export const atoms: Record<string, {name:string;shells:number[];color:string}> = {
 Li:{name:'الليثيوم',shells:[2,1],color:'#91d2dc'},F:{name:'الفلور',shells:[2,7],color:'#c4dd92'},Mg:{name:'المغنيسيوم',shells:[2,8,2],color:'#91d2dc'},Cl:{name:'الكلور',shells:[2,8,7],color:'#c4dd92'},H:{name:'الهيدروجين',shells:[1],color:'#e3eef4'},O:{name:'الأكسجين',shells:[2,6],color:'#ffb2a7'},C:{name:'الكربون',shells:[2,4],color:'#b3b7e6'}
};
export const bonds = [
 {id:'LiF',name:'فلوريد الليثيوم',symbols:['Li','F'],type:'ionic',steps:1,formula:'LiF',charges:[1,-1],explain:'يفقد الليثيوم إلكترونًا ويكتسبه الفلور. تتجاذب الأيونات المختلفة في الشحنة لتكوين رابطة أيونية.',page:4},
 {id:'MgCl2',name:'كلوريد المغنيسيوم',symbols:['Cl','Mg','Cl'],type:'ionic',steps:2,formula:'MgCl₂',charges:[-1,2,-1],explain:'يمنح المغنيسيوم إلكترونًا لكل ذرة كلور، فينتج Mg²⁺ وأيونان Cl⁻. تتعادل الشحنات في وحدة الصيغة MgCl₂.',page:5},
 {id:'H2',name:'جزيء الهيدروجين',symbols:['H','H'],type:'covalent',steps:1,formula:'H₂',charges:[0,0],explain:'تتشارك ذرتا الهيدروجين بزوج إلكتروني واحد؛ يصبح لكل ذرة إلكترونان في المستوى الأول.',page:6},
 {id:'O2',name:'جزيء الأكسجين',symbols:['O','O'],type:'covalent',steps:2,formula:'O₂',charges:[0,0],explain:'تتشارك ذرتا الأكسجين بزوجين من الإلكترونات، فتتكون رابطة تساهمية ثنائية O=O.',page:6},
 {id:'CH4',name:'جزيء الميثان',symbols:['C','H','H','H','H'],type:'covalent',steps:4,formula:'CH₄',charges:[0,0,0,0,0],explain:'تتشارك ذرة الكربون مع أربع ذرات هيدروجين بأربعة أزواج إلكترونية؛ تتكون أربع روابط تساهمية أحادية.',page:7}
] as const;
export function ionicShells(id:string,index:number,step:number){const b=bonds.find(x=>x.id===id)!;const s=[...atoms[b.symbols[index]].shells];let charge=0;if(id==='LiF') charge=step?b.charges[index]:0;if(id==='MgCl2') charge=index===1?step:index===0?(step>=1?-1:0):(step>=2?-1:0);s[s.length-1]-=charge;if(s[s.length-1]===0)s.pop();return {shells:s,charge};}
export const equations = [
 {name:'الخارصين والحمض',labels:['Zn','HCl','ZnCl₂','H₂'],species:[{Zn:1},{H:1,Cl:1},{Zn:1,Cl:2},{H:2}],split:2,answer:[1,2,1,1]},
 {name:'أكسيد الكالسيوم — ص١٠',labels:['Ca','O₂','CaO'],species:[{Ca:1},{O:2},{Ca:1,O:1}],split:2,answer:[2,1,2]},
 {name:'كربونات البوتاسيوم — ص١٠',labels:['K₂CO₃','HNO₃','KNO₃','H₂O','CO₂'],species:[{K:2,C:1,O:3},{H:1,N:1,O:3},{K:1,N:1,O:3},{H:2,O:1},{C:1,O:2}],split:2,answer:[1,2,2,1,1]},
 {name:'الأمونيا — ص١١',labels:['N₂','H₂','NH₃'],species:[{N:2},{H:2},{N:1,H:3}],split:2,answer:[1,3,2]}
];
export function countAtoms(eq:typeof equations[number],coeff:number[]){const elements=[...new Set(eq.species.flatMap(s=>Object.keys(s)))];return elements.map(el=>({el,left:eq.species.reduce((n,s,i)=>n+(i<eq.split?((s as Record<string,number>)[el]||0)*coeff[i]:0),0),right:eq.species.reduce((n,s,i)=>n+(i>=eq.split?((s as Record<string,number>)[el]||0)*coeff[i]:0),0)}));}
export const compounds=[
 ['حمض الهيدروكلوريك','HCl','حموض','في معدة الإنسان'],['حمض الكبريتيك','H₂SO₄','حموض','بطارية السيارة'],['حمض النيتريك','HNO₃','حموض','صناعة الأسمدة'],['حمض الخليك','CH₃COOH','حموض','صناعة الخل'],
 ['هيدروكسيد الصوديوم','NaOH','قواعد','صناعة الصابون الصلب'],['هيدروكسيد البوتاسيوم','KOH','قواعد','صناعة الصابون السائل'],['هيدروكسيد المغنيسيوم','Mg(OH)₂','قواعد','علاج حموضة المعدة'],
 ['كلوريد الصوديوم','NaCl','أملاح','حفظ الأجبان والمخللات'],['بايكربونات الصوديوم','NaHCO₃','أملاح','صناعة الخبز والكعك'],['كبريتات المغنيسيوم','MgSO₄','أملاح','علاج الإمساك'],['كبريتات النحاس','CuSO₄','أملاح','الطلاء الكهربائي'],
 ['أكسيد الكالسيوم','CaO','أكاسيد','مثال تمهيد الدرس'],['ثاني أكسيد الرصاص','PbO₂','أكاسيد','بطارية السيارة'],['أكسيد الخارصين','ZnO','أكاسيد','صناعة الدهانات'],['ثاني أكسيد الكربون','CO₂','أكاسيد','إطفاء الحرائق'],['أكسيد السيليكون','SiO₂','أكاسيد','صناعة الزجاج']
];
export function neutralize(drops:number){const base=0.005,acid=drops*0.0005;return {base:Math.max(0,base-acid),acid:Math.max(0,acid-base),salt:Math.min(base,acid),state:acid<base?'قاعدي':Math.abs(acid-base)<1e-9?'متعادل':'حمضي'};}

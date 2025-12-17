const fs = require('fs');
const path = require('path');
(async function(){
  try{
    const mod = await import('../PORTAL/results/student.js');
    const sr = mod.studentResults;
    const csvdir = path.join('student result','primary2');
    const files = fs.readdirSync(csvdir).filter(f=>f.endsWith('.csv'));
    const mismatches = [];
    files.forEach(f=>{
      const txt = fs.readFileSync(path.join(csvdir,f),'utf8').trim();
      if(!txt) return;
      const rows = txt.split('\n');
      rows.forEach((line,idx)=>{
        const cols = line.split(',').map(c=>c.trim());
        // Skip header rows
        if(cols[0] && cols[0].toLowerCase().includes('admissionname')) return;
        if(cols.length < 9) return;
        const [name,subject,test1,test2,exam,total,grade,remark,source] = cols.map(c=>c.trim());
        const key = Object.keys(sr).find(k=>k.toLowerCase() === name.toLowerCase());
        if(!key){ mismatches.push({file:f,line:idx+1,name,subject,issue:'missing_student'}); return; }
        const s = sr[key].subjects.find(su=>su.name.toLowerCase() === subject.toLowerCase());
        if(!s){ mismatches.push({file:f,line:idx+1,name,subject,issue:'missing_subject'}); return; }
        const diffs = {};
        if(String(s.test1) !== test1) diffs.test1 = {repo:s.test1, csv:test1};
        if(String(s.test2) !== test2) diffs.test2 = {repo:s.test2, csv:test2};
        if(String(s.exam) !== exam) diffs.exam = {repo:s.exam, csv:exam};
        if(String(s.total) !== total) diffs.total = {repo:s.total, csv:total};
        if(String(s.grade) !== grade) diffs.grade = {repo:s.grade, csv:grade};
        if(String(s.remark) !== remark) diffs.remark = {repo:s.remark, csv:remark};
        if(Object.keys(diffs).length) mismatches.push({file:f,line:idx+1,name,subject,diffs});
      });
    });
    console.log('Found mismatches:', mismatches.length);
    if(mismatches.length) {
      const out = path.join('student result', `p2-compare-${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
      fs.writeFileSync(out, JSON.stringify(mismatches,null,2));
      console.log('Wrote details to', out);
    }
  }catch(e){ console.error('Error', e); process.exit(1);} 
})();
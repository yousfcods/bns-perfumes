import fs from 'fs';

const versions = [
  'v1784493418',
  'v1784493421',
  'v1784493426',
  'v1784493427',
  'v1784493428',
  'v1784500147'
];

const suffixes = [
  '', // empty / no suffix
  'qqmm0w',
  'xeomke',
  'lq4qaz',
  'fj2vcs',
  'lcs3uy',
  'rm38hj',
  'p8kudm',
  'uuxhwu',
  'afjrl7'
];

const extensions = ['webp', 'jpg', 'png', 'jpeg'];

const candidatesMap = {
  'cartier-declaration': [
    'Cartier_declaration', 'cartier_declaration', 'Cartier_Declaration',
    'Declaration_cartier', 'declaration_cartier', 'Declaration_Cartier',
    'Declaration', 'declaration', 'Cartier'
  ],
  'ihsas-al-arabia': [
    'Ihsas_al_arabia', 'ihsas_al_arabia', 'Ihsas_Al_Arabia',
    'Ihsas', 'ihsas', 'Ihsas_arabia', 'ihsas_arabia',
    'Ihsas_al_arabiya', 'ihsas_al_arabiya', 'Ihsas_Al_Arabiya'
  ],
  'hersch-lahab': [
    'Hersch_lahab', 'hersch_lahab', 'Hersch_Lahab',
    'Lahab', 'lahab', 'Lahab_hersch', 'lahab_hersch'
  ],
  'scandal-pour-homme': [
    'Scandal_pour_homme', 'scandal_pour_homme', 'Scandal_Pour_Homme',
    'Scandal_homme', 'scandal_homme', 'Scandal_Homme',
    'Scandal', 'scandal', 'Scandal_men', 'scandal_men'
  ],
  'burberry-her': [
    'Burberry_her', 'burberry_her', 'Burberry_Her',
    'Her', 'her', 'Burberry'
  ],
  'armani-my-way': [
    'My_way', 'my_way', 'My_Way',
    'Armani_my_way', 'armani_my_way', 'Armani_My_Way',
    'Myway', 'myway'
  ],
  'versace-eros-najim': [
    'Versace_eros_najim', 'versace_eros_najim', 'Versace_Eros_Najim',
    'Eros_najim', 'eros_najim', 'Eros_Najim',
    'Eros_najm', 'eros_najm', 'Eros_Najm',
    'Najim', 'najim'
  ],
  'ch-good-girl': [
    'Good_girl', 'good_girl', 'Good_Girl',
    'Ch_good_girl', 'ch_good_girl', 'CH_Good_Girl',
    'Goodgirl', 'goodgirl'
  ],
  'lancome-idole': [
    'Idole', 'idole', 'Idôle', 'idôle',
    'Lancome_idole', 'lancome_idole', 'Lancome_Idole',
    'Lancôme_idole', 'lancôme_idole', 'Lancôme_Idole'
  ]
};

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1.0s timeout is enough for fast CDN
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function probe() {
  console.log('Comprehensive Probe Starting...');
  const found = {};
  const allTests = [];

  for (const [id, names] of Object.entries(candidatesMap)) {
    found[id] = [];
    for (const v of versions) {
      for (const name of names) {
        for (const suffix of suffixes) {
          for (const ext of extensions) {
            // Test 1: Suffix with underscore
            let url1 = suffix 
              ? `https://res.cloudinary.com/qmmcvx8e/image/upload/${v}/${name}_${suffix}.${ext}`
              : `https://res.cloudinary.com/qmmcvx8e/image/upload/${v}/${name}.${ext}`;
            allTests.push({ id, url: url1 });

            // Test 2: Suffix directly attached
            if (suffix) {
              let url2 = `https://res.cloudinary.com/qmmcvx8e/image/upload/${v}/${name}${suffix}.${ext}`;
              allTests.push({ id, url: url2 });
            }
          }
        }
      }
    }
  }

  // Deduplicate URLs to test
  const uniqueTests = [];
  const seenUrls = new Set();
  for (const test of allTests) {
    if (!seenUrls.has(test.url)) {
      seenUrls.add(test.url);
      uniqueTests.push(test);
    }
  }

  console.log(`Total unique URLs to test: ${uniqueTests.length}`);

  const batchSize = 150;
  for (let i = 0; i < uniqueTests.length; i += batchSize) {
    const batch = uniqueTests.slice(i, i + batchSize);
    console.log(`Testing batch ${i / batchSize + 1} / ${Math.ceil(uniqueTests.length / batchSize)}...`);
    
    await Promise.all(batch.map(async (item) => {
      // If we already found a working URL for this ID, we can optionally skip to make it extremely fast
      // (Actually let's find all working ones just in case one is a better image, or we can stop at first)
      if (found[item.id] && found[item.id].length > 0) return;

      const isOk = await checkUrl(item.url);
      if (isOk) {
        console.log(`\n🎉 [HIT] ${item.id} -> ${item.url}\n`);
        found[item.id].push(item.url);
        fs.appendFileSync('discovered_hits.txt', `${item.id}: ${item.url}\n`);
      }
    }));
  }

  console.log('Finished comprehensive probe.');
  console.log(JSON.stringify(found, null, 2));
  fs.writeFileSync('discovered_hits_json.txt', JSON.stringify(found, null, 2));
}

probe();

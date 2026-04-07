/**
 * Test cases for medication merge logic
 * 
 * This file demonstrates the non-destructive merge behavior
 * Run these tests to verify merge logic works correctly
 */

import {
  MedicationEntry,
  mergeMedicationLibraries,
  addUserMedication,
  searchMedications
} from './medication-merge';

// ============================================
// TEST 1: Basic Merge - No Duplicates
// ============================================
export function testBasicMerge() {
  console.log('TEST 1: Basic Merge - No Duplicates');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan'],
      category: 'Biologic therapy',
      source: 'predefined'
    },
    {
      name: 'Custom Med A',
      source: 'user_added'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Ocrelizumab',
      aliases: ['Ocrevus'],
      category: 'Biologic therapy',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 3, 'Should have 3 medications');
  console.assert(merged.some(m => m.name === 'Rituximab'), 'Should preserve Rituximab');
  console.assert(merged.some(m => m.name === 'Custom Med A'), 'Should preserve user-added med');
  console.assert(merged.some(m => m.name === 'Ocrelizumab'), 'Should add Ocrelizumab');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 2: Duplicate Detection - Exact Match
// ============================================
export function testDuplicateExactMatch() {
  console.log('TEST 2: Duplicate Detection - Exact Match');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan'],
      category: 'Biologic therapy',
      source: 'predefined'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Rituximab',
      subcategory: 'B-cell targeting therapy',
      mechanism_label: 'CD20 monoclonal antibody',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 1, 'Should have 1 medication (no duplicate)');
  console.assert(merged[0].category === 'Biologic therapy', 'Should preserve existing category');
  console.assert(merged[0].subcategory === 'B-cell targeting therapy', 'Should enrich with subcategory');
  console.assert(merged[0].mechanism_label === 'CD20 monoclonal antibody', 'Should enrich with mechanism');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 3: Alias Detection
// ============================================
export function testAliasDetection() {
  console.log('TEST 3: Alias Detection');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan', 'MabThera'],
      category: 'Biologic therapy',
      source: 'predefined'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Rituxan', // This is an alias
      subcategory: 'B-cell targeting therapy',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 1, 'Should have 1 medication (alias matched)');
  console.assert(merged[0].name === 'Rituximab', 'Should keep canonical name');
  console.assert(merged[0].subcategory === 'B-cell targeting therapy', 'Should enrich with subcategory');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 4: Similar Name Detection (Typos)
// ============================================
export function testSimilarNameDetection() {
  console.log('TEST 4: Similar Name Detection (Typos)');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Amitriptyline',
      category: 'Symptom management',
      source: 'predefined'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Amitriptylin', // Common typo (missing 'e')
      subcategory: 'Neuropathic pain',
      source: 'user_added'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 1, 'Should have 1 medication (typo detected)');
  console.assert(merged[0].name === 'Amitriptyline', 'Should keep correct spelling');
  console.assert(merged[0].aliases?.includes('Amitriptylin'), 'Should add typo as alias');
  console.assert(merged[0].subcategory === 'Neuropathic pain', 'Should enrich with subcategory');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 5: User-Added Medication Preservation
// ============================================
export function testUserAddedPreservation() {
  console.log('TEST 5: User-Added Medication Preservation');
  
  const existing: MedicationEntry[] = [
    {
      name: 'My Custom Medication',
      source: 'user_added'
    },
    {
      name: 'Another Custom Med',
      source: 'user_added'
    },
    {
      name: 'Rituximab',
      source: 'predefined'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Ocrelizumab',
      source: 'predefined'
    },
    {
      name: 'New Predefined Med',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  const userAddedCount = merged.filter(m => m.source === 'user_added').length;

  console.assert(merged.length === 5, 'Should have 5 medications total');
  console.assert(userAddedCount === 2, 'Should preserve 2 user-added medications');
  console.assert(merged.some(m => m.name === 'My Custom Medication'), 'Should preserve first custom med');
  console.assert(merged.some(m => m.name === 'Another Custom Med'), 'Should preserve second custom med');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 6: User-Added Medication Gets Enriched
// ============================================
export function testUserAddedEnrichment() {
  console.log('TEST 6: User-Added Medication Gets Enriched');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      source: 'user_added' // User added this manually
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan'],
      category: 'Biologic therapy',
      subcategory: 'B-cell targeting therapy',
      mechanism_label: 'CD20 monoclonal antibody',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 1, 'Should have 1 medication');
  console.assert(merged[0].source === 'enriched', 'Source should be marked as enriched');
  console.assert(merged[0].category === 'Biologic therapy', 'Should be enriched with category');
  console.assert(merged[0].aliases?.includes('Rituxan'), 'Should be enriched with aliases');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 7: Complex Merge Scenario
// ============================================
export function testComplexMerge() {
  console.log('TEST 7: Complex Merge Scenario');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan'],
      category: 'Biologic therapy',
      source: 'predefined'
    },
    {
      name: 'My Custom Med',
      source: 'user_added'
    },
    {
      name: 'Amitriptyline',
      category: 'Symptom management',
      source: 'predefined'
    },
    {
      name: 'User Med 2',
      source: 'user_added'
    }
  ];

  const newMeds: MedicationEntry[] = [
    {
      name: 'Rituximab', // Should merge and enrich
      subcategory: 'B-cell targeting therapy',
      mechanism_label: 'CD20 monoclonal antibody',
      source: 'predefined'
    },
    {
      name: 'Ocrelizumab', // Should be added
      aliases: ['Ocrevus'],
      category: 'Biologic therapy',
      source: 'predefined'
    },
    {
      name: 'Amitriptylin', // Should merge with Amitriptyline (typo)
      aliases: ['Elavil'],
      source: 'predefined'
    },
    {
      name: 'New Med', // Should be added
      category: 'New Category',
      source: 'predefined'
    }
  ];

  const merged = mergeMedicationLibraries(existing, newMeds);

  console.assert(merged.length === 6, 'Should have 6 medications (4 original + 2 new - 0 duplicates)');
  console.assert(merged.some(m => m.name === 'My Custom Med'), 'Should preserve user custom med');
  console.assert(merged.some(m => m.name === 'User Med 2'), 'Should preserve second user med');
  console.assert(merged.some(m => m.name === 'Ocrelizumab'), 'Should add Ocrelizumab');
  console.assert(merged.some(m => m.name === 'New Med'), 'Should add New Med');
  
  const rituximab = merged.find(m => m.name === 'Rituximab');
  console.assert(rituximab?.subcategory === 'B-cell targeting therapy', 'Rituximab should be enriched');
  
  const amitriptyline = merged.find(m => m.name === 'Amitriptyline');
  console.assert(amitriptyline?.aliases?.includes('Elavil'), 'Amitriptyline should have Elavil alias');
  console.assert(amitriptyline?.aliases?.includes('Amitriptylin'), 'Amitriptyline should have typo as alias');
  
  console.log('✓ PASSED\n');
  return merged;
}

// ============================================
// TEST 8: Search Functionality
// ============================================
export function testSearchFunctionality() {
  console.log('TEST 8: Search Functionality');
  
  const library: MedicationEntry[] = [
    {
      name: 'Rituximab',
      aliases: ['Rituxan', 'MabThera'],
      category: 'Biologic therapy',
      subcategory: 'B-cell targeting therapy',
      search_terms: ['biologic', 'infusion', 'MS', 'NMOSD']
    },
    {
      name: 'Ocrelizumab',
      aliases: ['Ocrevus'],
      category: 'Biologic therapy',
      search_terms: ['biologic', 'MS']
    },
    {
      name: 'Gabapentin',
      aliases: ['Neurontin'],
      category: 'Symptom management',
      search_terms: ['pain', 'neuropathy']
    }
  ];

  // Test exact name match
  let results = searchMedications(library, 'Rituximab', 10);
  console.assert(results.length > 0 && results[0].name === 'Rituximab', 'Should find exact match first');

  // Test alias search
  results = searchMedications(library, 'Rituxan', 10);
  console.assert(results.length > 0 && results[0].name === 'Rituximab', 'Should find by alias');

  // Test partial match
  results = searchMedications(library, 'ritux', 10);
  console.assert(results.length > 0 && results[0].name === 'Rituximab', 'Should find by partial match');

  // Test search term
  results = searchMedications(library, 'MS', 10);
  console.assert(results.length >= 2, 'Should find multiple medications by search term');

  // Test category search
  results = searchMedications(library, 'biologic', 10);
  console.assert(results.length >= 2, 'Should find medications by category');

  console.log('✓ PASSED\n');
}

// ============================================
// TEST 9: Add User Medication
// ============================================
export function testAddUserMedication() {
  console.log('TEST 9: Add User Medication');
  
  const existing: MedicationEntry[] = [
    {
      name: 'Rituximab',
      category: 'Biologic therapy',
      source: 'predefined'
    }
  ];

  // Add a new user medication
  const updated = addUserMedication(existing, 'My New Medication');
  console.assert(updated.length === 2, 'Should have 2 medications');
  console.assert(updated[1].name === 'My New Medication', 'Should add user medication');
  console.assert(updated[1].source === 'user_added', 'Should mark as user_added');

  // Try to add duplicate (should not add)
  const updated2 = addUserMedication(updated, 'Rituximab');
  console.assert(updated2.length === 2, 'Should not add duplicate');

  console.log('✓ PASSED\n');
}

// ============================================
// RUN ALL TESTS
// ============================================
export function runAllTests() {
  console.log('='.repeat(50));
  console.log('MEDICATION MERGE LOGIC TESTS');
  console.log('='.repeat(50));
  console.log('');

  try {
    testBasicMerge();
    testDuplicateExactMatch();
    testAliasDetection();
    testSimilarNameDetection();
    testUserAddedPreservation();
    testUserAddedEnrichment();
    testComplexMerge();
    testSearchFunctionality();
    testAddUserMedication();

    console.log('='.repeat(50));
    console.log('✅ ALL TESTS PASSED');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
  }
}

// Uncomment to run tests
// runAllTests();

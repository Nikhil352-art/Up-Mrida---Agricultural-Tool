// Spacing type selector change handler
 document.getElementById('spacing-type').addEventListener('change', function() {
    const customSpacing = document.getElementById('custom-spacing-container');
    if (this.value === 'custom') {
        customSpacing.classList.remove('hidden');
    } else {
        customSpacing.classList.add('hidden');
    }
});
        
// Fertilizer Calculator
function calculateFertilizer() {
    const cropType = document.getElementById('crop-type').value;
    const fieldArea = parseFloat(document.getElementById('field-area').value);
    const soilType = document.getElementById('soil-type').value;
    const currentN = parseFloat(document.getElementById('current-n').value) || 0;
    const currentP = parseFloat(document.getElementById('current-p').value) || 0;
    const currentK = parseFloat(document.getElementById('current-k').value) || 0;
    const targetYield = parseFloat(document.getElementById('target-yield').value) || 0;
            
    if (!cropType || isNaN(fieldArea) || fieldArea <= 0 || !soilType) {
        alert('Please fill all required fields with valid values');
        return;
    }
            
// Simplified calculation 
const cropData = {
    wheat: {n: 120, p: 60, k: 80},
    rice: {n: 100, p: 50, p: 60},
    corn: {n: 150, p: 70, k: 90},
    soybean: {n: 60, p: 40, k: 70},
    cotton: {n: 80, p: 50, k: 60}
    };
            
const soilFactor = {
    sandy: 1.2,
    loamy: 1.0,
    clay: 1.1,
    silt: 0.9
    };
            
const yieldFactor = 1 + (targetYield / 1000);
    const baseN = cropData[cropType]?.n || 100;
    const baseP = cropData[cropType]?.p || 50;
    const baseK = cropData[cropType]?.k || 70;
            
    const N = Math.round((baseN * yieldFactor * soilFactor[soilType] - currentN) * fieldArea);
    const P = Math.round((baseP * yieldFactor * soilFactor[soilType] - currentP) * fieldArea);
    const K = Math.round((baseK * yieldFactor * soilFactor[soilType] - currentK) * fieldArea);
            
    const result = `
        <div class="space-y-3">
            <div class="flex justify-between border-b pb-2">
                <span class="font-medium">Nitrogen (N):</span>
                <span>${N} kg</span>
            </div>
            <div class="flex justify-between border-b pb-2">
                <span class="font-medium">Phosphorus (P₂O₅):</span>
                <span>${P} kg</span>
            </div>
            <div class="flex justify-between border-b pb-2">
                span class="font-medium">Potassium (K₂O):</span>
                <span>${K} kg</span>
            </div>
            <div class="flex justify-between font-bold pt-2 text-green-700">
                <span>Total Requirement:</span>
                <span>${N + P + K} kg</span>
            </div>
        </div>
                
        <div class="mt-4 p-3 bg-green-100 rounded">
            <h4 class="font-medium text-green-800 mb-1">Recommended Fertilizers</h4>
            <ul class="text-sm text-green-700 list-disc pl-5">
                <li>Urea: ${Math.round(N * 0.4)} kg</li>
                <li>DAP: ${Math.round(P * 0.3)} kg</li>
                <li>MOP: ${Math.round(K * 0.3)} kg</li>
            </ul>
                <p class="text-xs text-green-600 mt-2">* Actual fertilizer blend may vary based on local availability</p>
        </div>
    `;
            
document.getElementById('fertilizer-result').innerHTML = result;
    }
        
// Tree Estimator
function calculateTrees() {
    const treeSpecies = document.getElementById('tree-species').value;
    const plantingArea = parseFloat(document.getElementById('planting-area').value);
    const spacingType = document.getElementById('spacing-type').value;
            
    if (!treeSpecies || isNaN(plantingArea) || plantingArea <= 0 || !spacingType) {
        alert('Please fill all required fields with valid values');
        return;
    }
            
    let rowSpacing, treeSpacing;
            
    if (spacingType === 'custom') {
        rowSpacing = parseFloat(document.getElementById('row-spacing').value) || 5;
        treeSpacing = parseFloat(document.getElementById('tree-spacing').value) || 5;
        } else {
        // Default spacing based on tree type and spacing configuration
        const spacingData = {
            timber: {row: 8, tree: 8},
            fruit: {row: 5, tree: 5},
            mixed: {row: 6, tree: 6}
        };
                
            rowSpacing = spacingData[spacingType]?.row || 5;
            treeSpacing = spacingData[spacingType]?.tree || 5;
        }
            
        const areaPerTree = (rowSpacing * treeSpacing) / 10000; // in hectares
        const numberOfTrees = Math.round(plantingArea / areaPerTree);
            
        const result = `
            <div class="space-y-3">
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Tree Species:</span>
                    <span>${document.getElementById('tree-species').options[document.getElementById('tree-species').selectedIndex].text}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Planting Area:</span>
                    <span>${plantingArea} ha</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Row Spacing:</span>
                    <span>${rowSpacing} m</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Tree Spacing:</span>
                    <span>${treeSpacing} m</span>
                </div>
                <div class="flex justify-between font-bold pt-2 text-green-700">
                    <span>Number of Trees:</span>
                    <span>${numberOfTrees.toLocaleString()}</span>
                </div>
            </div>
                
            <div class="mt-4 p-3 bg-green-100 rounded">
                <h4 class="font-medium text-green-800 mb-1">Planting Density</h4>
                <p class="text-sm text-green-700">${Math.round(numberOfTrees / plantingArea)} trees per hectare</p>
            </div>
        `;
            
        document.getElementById('tree-result').innerHTML = result;
            
        // Simple visualization
        let vizHtml = '<div class="text-center">';
        vizHtml += `<h5 class="text-sm font-medium mb-2">Planting Layout (${treeSpecies})</h5>`;
            
        // Show a small grid representation
        const gridSize = 5; // Show a 5x5 grid for visualization
        vizHtml += '<div class="inline-grid gap-1" style="grid-template-columns: repeat(5, 20px);">';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
            vizHtml += `<div class="w-5 h-5 bg-green-300 border border-green-400 rounded-sm flex items-center justify-center text-xs">🌱</div>`;
            }
        }
        vizHtml += '</div>';
            
        vizHtml += `<p class="text-xs mt-2">Each square represents ${rowSpacing}m × ${treeSpacing}m spacing</p>`;
        vizHtml += '</div>';
            
       document.getElementById('tree-visualization').innerHTML = vizHtml;
    }
        
    // Sales Predictor
    function predictSales() {
        const region = document.getElementById('region').value;
        const fieldSize = parseFloat(document.getElementById('field-size').value);
        const soilQuality = document.getElementById('soil-quality').value;
        const timeFrame = parseInt(document.getElementById('time-frame').value);
        const currentMarket = parseFloat(document.getElementById('current-market').value);
        
        if (!region || isNaN(fieldSize) || fieldSize <= 0 || !soilQuality || isNaN(currentMarket) || currentMarket <= 0) {
            alert('Please fill all required fields with valid values');
            return;
        }
            
        // Simplified calculation (in a real app this would use more complex predictive models)
        const regionFactor = {
            north: 1.2,
            south: 1.0,
            east: 0.9,
            west: 1.1,
            central: 1.0
        };
            
        const soilFactor = {
            high: 1.3,
            medium: 1.0,
            low: 0.8
        };
            
        const growthRate = 0.05; // 5% annual growth assumption
        const currentValue = currentMarket * fieldSize;
            
        // Calculate projected value with compounding growth
        let projectedValue = currentValue;
        let projections = [currentValue];
            
        for (let i = 1; i <= timeFrame; i++) {
            projectedValue = projectedValue * (1 + growthRate * regionFactor[region] * soilFactor[soilQuality]);
            projections.push(Math.round(projectedValue));
        }
            
        const result = `
            <div class="space-y-3">
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Current Value:</span>
                    <span>₹${currentValue.toLocaleString('en-IN')}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Projected Value in ${timeFrame} years:</span>
                    <span>₹${projections[timeFrame].toLocaleString('en-IN')}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Annual Growth Rate:</span>
                    <span>${(growthRate * regionFactor[region] * soilFactor[soilQuality] * 100).toFixed(1)}%</span>
                </div>
            </div>
        `;
            
        document.getElementById('sales-result').innerHTML = result;
            
        // Initialize chart if not already present
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById('sales-chart').getContext('2d');
                
            // Hide placeholder
            document.getElementById('chart-placeholder').style.display = 'none';
            document.getElementById('sales-chart').style.display = 'block';
                
            // Create chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Current'].concat(Array.from({length: timeFrame}, (_, i) => `Year ${i + 1}`)),
                    datasets: [{
                        label: 'Projected Value (₹)',
                        data: projections,
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
                    }]
                },
                options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '₹' + context.parsed.y.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                }
            }
        });
    } 
    
}
    
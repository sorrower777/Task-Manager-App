// quick syntax/load test for routes.js
try{
    require('./src/routes');
    console.log('routes.js loaded successfully');
}catch(err){
    console.error('Error loading routes.js:', err.message);
    process.exit(1);
}

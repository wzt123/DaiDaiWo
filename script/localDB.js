apiready = function(){
	var db = api.require('db');
	db.openDatabase({
	    name: 'oderForm'
	}, function(ret, err){        
	    if( ret.status ){
	        var sql = "creat table if not exist 'order' (VG_name varchar(9),VG_price float(9),VG_amount float(9),money float(9))";
	    	db.executeSql({
	            name:'oderForm',
	            sql:sql
            },function(ret,err){
            	//coding...
            });
	    }else{
	        alert( JSON.stringify( err ) );
	    }
	});
}
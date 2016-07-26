var db = null;
apiready = function() {
	db = api.require('db');
	db.openDatabase({
		name : 'orderForm'
	}, function(ret, err) {
		if (ret.status) {
			var sql = 'CREATE TABLE orderForm (VG_name varchar(255), VG_price varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255))';
			db.executeSql({
				name : 'orderForm',
				sql : sql
			}, function(ret, err) {
				if (ret) {
					api.alert({
						msg : "数据表创建成功或已存在"
					});
				} else {
					api.alert({
						msg : "数据表创建失败"
					});
				}
			});
		} else {
			alert(JSON.stringify(err));
		}
	});
}
function VGdata(name, price, amount, money) {
	db.openDatabase({
		name : 'orderForm'
	}, function(ret, err) {
		if (ret) {
			var sql = "insert into order (VG_name,VG_price,VG_amount,money) value (name,price,amount,money)"
			db.executeSql({
				name : 'orderForm',
				sql : sql
			}, function(ret, err) {
				if (ret) {
					api.alert({
						msg : "本地数据插入成功"
					}, function(ret, err) {
						//coding...
					});
				} else {
					api.alert({
						msg : "本地数据插入失败"
					}, function(ret, err) {
						//coding...
					});
				}
			});
		} else {
			api.alert({
				msg : "本地数据库打开失败"
			}, function(ret, err) {
				//coding...
			});
		}
	});

}
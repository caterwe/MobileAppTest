import Model from './Model';

class Dish extends Model {
    constructor(id,catererId,name,info,mainImage) {
		super();
		this.Id=id;
		this.CatererId=catererId;
		this.Name=name;
		this.Info=info;
		this.MainImage=mainImage;
    }

    getTableName() {
        return "Dish";
    }

    static getByName(name) {
        return new Dish().getAllBy([{name:"Name",value:'%'+name}]);
	}
}

export default Dish;
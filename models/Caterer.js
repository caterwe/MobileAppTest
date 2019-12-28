import Model from './Model';

class Caterer extends Model {
    constructor(id,name,description,address1,address2,city,state,zipcode,mainImage) {
		super();
		this.Id=id;
		this.Name=name;
		this.Description=description;
		this.Address1=address1;
		this.Address2=address2;
		this.City=city;
		this.State=state;
		this.Zipcode=zipcode;
		this.MainImage=mainImage;
    }

    getTableName() {
        return "Caterer";
    }

    static getByName(name) {
        return new Caterer().getAllBy([{name:"Name",value:'%'+name+'%'}]);
		}

		static getAllCaterers() {
			return new Caterer().getAll();
		}
	
}

export default Caterer;
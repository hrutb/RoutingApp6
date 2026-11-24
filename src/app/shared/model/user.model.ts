export interface Iuser{
     Uid:string,
     currentAddress:Address ,
     permanentAddress:Address,
     description:string ,
     experience:number ,
     id:string ,
     imageUrl:string,
     name:string,
     role:string ,
     status:boolean ,
     skills:[],

}





export interface Address{
           city:string,
           country:string,
           state:string,
           zipcode:number
}

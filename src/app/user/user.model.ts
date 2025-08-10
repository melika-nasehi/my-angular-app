export interface user_interface {
    id : string;
    username : string 
    password: string 
    first_name : string
    last_name : string 
    role : 'OW'|'MN'|'CT'|'VW' ;
}

export interface profile_interface {
    user_id : string
    profile_image : string
    bio : string
    skills : string
}
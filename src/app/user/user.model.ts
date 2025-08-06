export interface user_interface {
    id : string;
    user_name : string 
    password: string 
    first_name : string
    last_name : string 
    role : 'OW'|'MN'|'CT'|'VW' ;
}

export interface profile_interface {
    user_id : string
    avatar : string
    bio : string
    skills : string
}
// time complexity  = > size of object 
import myconst from '../constant/constant.mjs'
export function search(lang, qry) {
    {
        console.log(lang, qry, 'hello world ');
        for (let key in myconst) {
            if (key === lang) {
                for (let key2 in myconst[key]) {
                    if (qry === key2)
                        return myconst[key][qry];
                }
            };
        }
        // default language is english if that language is not avialable 
        return myconst.english.emailNotfound;
    }
}

export function response(sucess = false, message = null, status_code = null, data = null, res) {
    res.json(
        {
            "success": sucess,
            "message": message,
            "status_code": status_code,
            "data": data
        }
    )
}
export function valEmail(email) {
    let atposition = email.indexOf("@");
    let dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        return true;
    }
    return false;
}
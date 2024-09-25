export const useProducts = ()=>{
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0NzI4ZmI0LTQ1YjQtNDcxOS1iYzBiLWY5ZWQ1NzRkMjQ1MSIsImlhdCI6MTcyNTQ1MzY4MH0.NeSMS5xBL7ux-1gnSxCJngrUEwR9Rc7ALUpFE8euX5w"
    const getAllProducts = async()=>{
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")
            // myHeaders.append("Authorization", "Bearer " + localStorage.getItem("x-auth-token"));
            // myHeaders.append("Authorization", "Bearer " + token);

            const requestOptions = {
              method: "GET",
              headers: myHeaders
            };
            let response = await fetch(`http://localhost:8888/api/v1/product/productList`, requestOptions);
            let result = await response.json();
            if(result.status == 200){
              // alert(result.message);
              return result
            }else{
              alert(result.message);
    
            }
        } catch (error) {
            console(error)
        }
    }

    return {getAllProducts}
}
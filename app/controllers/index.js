import Api from "./../services/callApi.js";
const api = new Api();

const getEle = (id) => document.getElementById(id);

// const renderUI = (data) => {
//     let content = "";
//     data.forEach((food) => {
//         content += `
//         <tr>
//             <td>${food.id}</td>
//             <td>${food.name}</td>
//             <td>
//                 <img src="./../assets/img/${food.image}" width="50px" alt="image"/>
//             </td>
//             <td>${food.type}</td>
//             <td>${food.price}</td>
//             <td>${food.promotion}</td>
//             <td>${food.promotionPrice}</td>
//             <td>${food.status}</td>
//             <td>
//                 <button class="btn btn-info">Edit</button>
//                 <button class="btn btn-danger">Delete</button>
//             </td>
//         </tr>
//         `
//     });
// };

const renderUI = (data) => {
    const contentHTML = data.reduce((content, food) => {
        return (content += `
        <tr>
            <td>${food.id}</td>
            <td>${food.name}</td>
            <td>
                <img src="./../assets/img/${food.image}" width="50px" alt="image"/>
            </td>
            <td>${food.type}</td>
            <td>${food.price}</td>
            <td>${food.promotion}</td>
            <td>${food.promotionPrice}</td>
            <td>${food.status === "1" ? "còn" : "hết"}</td>
            <td>
                <button class="btn btn-info">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `);
    }, "");
    getEle("tbodyFood").innerHTML = contentHTML;
}

const getListFood = () => {
    api.fetchData()
        .then((result) => {
            renderUI(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
getListFood();

getEle("btnThem").onclick = () => {
    getEle("exampleModalLabel").innerHTML = "Thêm món ăn";
    getEle("btnCapNhat").style.display = none;
}

/**
 * Add Food
 */

getEle("btnThemMon").onclick = () => {
    //Dom tới các thẻ input lấy value
    const name = getEle("tenMon").value;
    const type = getEle("loai").value;
    const price = getEle("giaMon").value;
    const promotion = getEle("khuyenMai").value;
    const status = getEle("tinhTrang").value;
    const image = getEle("hinhMon").value;
    const description = getEle("moTa").value;

    //tạo đối tượng food từ lớp đối tượng Food
    const food = new Food(
        "",
        name,
        type,
        price,
        promotion,
        status,
        image,
        description
    );
    food.calcPromotionPrice();
    console.log(food);


    api.fetchData()
        .then(() => {
            getListFood
            document.getElementsByClassName("close")
        })
};


/**
 * Delete Food
 */
function deleteFood(id) {
    api.deleteFood(id)
        .then((result) => {
            alert(`Delete ${result.data.name} Success`);
            getListFood();
        })
        .catch((error) => {
            console.log(error);
        })
}
//khai báo deleteFood ra ngoài window
window.deleteFood = deleteFood;


/**
 * Edit
 */
const editFood = (id) => {
    getEle("exampleModalLabel").innerHTML = "Sửa món ăn";
    getEle("btnThemMon").style.display = "none";
    getEle("btnCapNhat").style.display = "block";

    api
        .getListFood(id)
        .then((result) => {
            getEle("foodID").value = food.id;
            getEle("tenMon").value = food.name;
            getEle("loai").value = food.type;
            getEle("giaMon").value = food.price;
            getEle("khuyenMai").value = food.promotion;
            getEle("tinhTrang").value = food.status;
            getEle("hinhMon").value = food.image;
            getEle("moTa").value = food.description;
        })
        .catch();
};
window.editFood = editFood;


/**
 * Update Food
 */

getEle("btnCapNhat").onclick = () => {
    //Dom tới các thẻ input lấy value
    const id = getEle("foodID").value;
    const name = getEle("tenMon").value;
    const type = getEle("loai").value;
    const price = getEle("giaMon").value;
    const promotion = getEle("khuyenMai").value;
    const status = getEle("tinhTrang").value;
    const image = getEle("hinhMon").value;
    const description = getEle("moTa").value;

    //tạo đối tượng food từ lớp đối tượng Food
    const food = new Food(
        id,
        name,
        type,
        price,
        promotion,
        status,
        image,
        description
    );
    food.calcPromotionPrice();
    
    api
    .updateFood()
    .then(() => {
        getListFood();
        document.getElementsByClassName("close")[0].click();
    })
    .catch();
}

var proDuctSer = new ProDuctService();

function getELE(id){
    return document.getElementById(id);
}

getListProducts();
function getListProducts(){
    proDuctSer.layPRODUCT()
    .then(function(result){
        console.log(result.data);
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
}
function setLocalStorage(mangSP){
    localStorage.setItem("DSSP",JSON.stringify(mangSP));
}

//Gắn sự kiện click cho button 
getELE("basic-addon2").addEventListener("click",function(){
    var mangSP = getLocalStorage();
    var mangTK = [];
    console.log(mangSP);

    var chuoiTK = getELE("inputTK").value;
    
    mangTK = proDuctSer.timKiemSP(mangSP,chuoiTK);

    console.log(mangTK);
    renderTable(mangTK);

});

function getLocalStorage(){
    var mangKQ = JSON.parse(localStorage.getItem("DSSP"));
    return mangKQ
}


getELE("btnThemSP").addEventListener("click",function(){
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `<button onclick="addProducts()" class="btn btn-success">Add Product</button>
    `;
});

function renderTable(mangSP){
    var content = "";
    var count = 1;
    mangSP.map(function(sp,index){
        content += `
            <tr>
                <td>${count}</td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>${sp.screen}</td>
                <td>${sp.backCamera}</td>
                <td>${sp.frontCamera}</td>
                <td>${sp.img}</td>
                <td>${sp.desc}</td>
                <td>${sp.type}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSP('${sp.id}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemSP('${sp.id}')">Xem</button>
                </td>
            </tr>
        `;
        count++;
    });
    getELE("tblDanhSachSP").innerHTML = content;
}

function addProducts(){
    //B1: Lấy thông tin(info) từ form
    // data, info
    var name = getELE("Name").value;
    var price = getELE("Price").value;
    var screen = getELE("Screen").value;
    var backCamera = getELE("BackCamera").value;
    var frontCamera = getELE("FrontCamera").value;
    var img = getELE("Img").value;
    var desc = getELE("Desc").value;    
    var type = getELE("Type").value;

    var sp = new ProDuct(name,price,screen,backCamera,frontCamera,img,desc,type);
    console.log(sp);

    //B2: lưu thông tin nhập về data
    proDuctSer.themSP(sp)
    .then(function(result){
        //Load lại danh sách sau khi thêm thành công      
         getListProducts();

         //gọi sự kiên click có sẵn của close button
         //Để tắt modal khi thêm thành công
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });


}

function xoaSP(id){
    proDuctSer.xoaSanPham(id)
    .then(function(result){
        //Load lại danh sách sau khi xóa thành công      
         getListProducts();
        
    })
    .catch(function(error){
        console.log(error);
    });

}

function xemSP(id){
    proDuctSer.xemSanPham(id)
    .then(function(result){
        console.log(result.data);
        //Mở modal 
        $('#myModal').modal('show');
        //Điền thông tin lên form
        getELE("Name").value  = result.data.name;
        getELE("Price").value  = result.data.price;
        getELE("Screen").value  = result.data.screen;
        getELE("BackCamera").value  = result.data.backCamera;
        getELE("FrontCamera").value = result.data.frontCamera;
        getELE("Img").value  = result.data.img;
        getELE("Desc").value  = result.data.desc;
        getELE("Type").value = result.data.type;

        //Thêm button cập nhật cho form
        var footerEle = document.querySelector(".modal-footer");
        footerEle.innerHTML = `
            <button onclick="capNhatSP('${result.data.id}')" class="btn btn-success">Update Product</button>
        `;

    })
    .catch(function(error){
        console.log(error);
    });

}

function capNhatSP(id){
    //B1: Lấy thông tin từ form
    var name = getELE("Name").value;
    var price = getELE("Price").value;
    var screen = getELE("Screen").value;
    var backCamera = getELE("BackCamera").value;
    var frontCamera = getELE("FrontCamera").value;
    var img = getELE("img").value;
    var desc = getELE("Desc").value;    
    var type = getELE("Type").value;

    var sp = new ProDuct(name,price,screen,backCamera,frontCamera,img,desc,type);
    console.log(sp);
    //B2: Cập nhật thông tin mới xuống data
    proDuctSer.capNhatSanPham(id,sp)
    .then(function(result){
        console.log(result.data);
        //Load lại danh sách sau khi cập nhật thành công      
         getListProducts();

         //gọi sự kiên click có sẵn của close button
         //Để tắt modal khi cập nhật thành công
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });

}


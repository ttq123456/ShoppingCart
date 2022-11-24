var spAPI = new SanPhamAPI();
const dsgh = new DanhSachGioHang();


function layDanhSachSanPham(){
    spAPI.layDanhSachSanPham()
    .then(function(result){
        console.log(result);
        hienThiGiaoDien(result.data);
    })
    .catch(function(error){
        console.log(error);
    })

}

layDanhSachSanPham();

function hienThiGiaoDien(mangSP){
    var content = "";
    mangSP.map(function(sp){
        content += `
        <div class="card col-3">
        <img src="${sp.img}" class="card-img-top py-2" alt="">
        <div class="card-body">
          <h5 class="card-title">${sp.name}</h5>
          <p class="card-text">
            <span>Màn hình: ${sp.screen};</span>
            <span>Camera trước: ${sp.frontCamera};</span>
            <span>Camera sau: ${sp.backCamera};</span>
            <br>
            <span>${sp.desc}</span>
          </p>
          <div>
            <p class="price">Giá tiền: ${sp.price}</p>
            <button type="button" class="btn btn-primary" onclick="kiemTraGioHang('${sp.id}','${sp.name}','${sp.price}')">Thêm vào giỏ hàng</button>
          </div>
        </div>
    </div>
        `
    })
    //console.log(content);

    document.querySelector("#dssp").innerHTML = content;
}

function kiemTraSanPham(mangSP){
    var mangKetQua =[];
    var idx = document.querySelector("#loaiPhone").selectedIndex;
    if (idx == 0) {
      layDanhSachSanPham();
      return;
    };
    var loaiDT = document.querySelector("#loaiPhone").value.toLowerCase();
    mangSP.map(function(sp){
      //var type = sp.type.toLowerCase();
      if (sp.type.toLowerCase() == loaiDT) {  
        mangKetQua.push(sp);
      }
    })
    hienThiGiaoDien(mangKetQua);
}

function locSanPham(){
  spAPI.layDanhSachSanPham()
    .then(function(result){
        console.log(result);
        kiemTraSanPham(result.data);
    })
    .catch(function(error){
        console.log(error);
    })

}


function setLocalStorage(){
  localStorage.setItem("DSGH",JSON.stringify(dsgh.mangGH));
}

function getLocalStorage(){
  if (localStorage.getItem("DSGH") != null) {
    dsgh.mangGH = JSON.parse(localStorage.getItem("DSGH"));    
  }
  hienThiGioHang(dsgh.mangGH);
}

getLocalStorage();

function hienThiGioHang(mang){
  var count = 1;
  var content = "";
  var tong = 0;
  mang.map(function(gh){
    var tongTien = gh.gia * gh.soLuong;
    tong = tong + tongTien;
    console.log(tongTien);
    content += `
      <tr>
        <td>${count++}</td>
        <td>${gh.tenSP}</td>
        <td>${gh.gia}</td>
        <td>
          <button class="btn btn-info" onclick="tangSoLuong('${gh.id}')">+</button> 
          ${gh.soLuong}
          <button class="btn btn-info" onclick="giamSoLuong('${gh.id}')">-</button> 
        </td>
        <td>${tongTien}</td>
        <td>
          <button class="btn btn-danger" onclick="xoaSP('${gh.id}')">Xoá</button>
        </td>
      </tr>
    `
  })
  console.log(tong);
  document.getElementById("giohang").innerHTML = content;
  document.getElementById("bill").innerHTML = "Tổng tiền cần thanh toán: " + tong;
}

function themGioHang(id, tenSP, gia) {
  var gh = new GioHang(id, tenSP, Number(gia),1);
  //console.log(gh.tongTien);
  dsgh.themGH(gh);
  hienThiGioHang(dsgh.mangGH);  
  setLocalStorage();
  console.log(dsgh.mangGH);
  
}

function kiemTraGioHang(id, tenSP, gia){
    if (dsgh.mangGH.length == 0) {
      //console.log(mangGH.length);
      themGioHang(id, tenSP, gia);
      return;
    }
    var kt = true;
    dsgh.mangGH.map(function(gh,index){
      console.log(gh.id);
      if (gh.id == id) {
        gh.soLuong++;
        //console.log(gh.soLuong);
        kt = false;
        hienThiGioHang(dsgh.mangGH);
        setLocalStorage();
      }
    })
    if (kt) themGioHang(id, tenSP, gia);          
}

function tangSoLuong(id){
    var viTri = dsgh.timViTri(id);
    //console.log(viTri);
    dsgh.mangGH[viTri].soLuong++;
    //console.log(dsgh.mangGH[viTri].soLuong) ;
    hienThiGioHang(dsgh.mangGH);
    setLocalStorage();
}

function giamSoLuong(id){
  var viTri = dsgh.timViTri(id);
  var giam = dsgh.mangGH[viTri].soLuong--;
  if (giam == 1) {
    xoaSP(id);
  }
  hienThiGioHang(dsgh.mangGH);
  setLocalStorage();
}

function xoaSP(id){
  dsgh.xoaGH(id);
  setLocalStorage();
  getLocalStorage();
}

function reset(){
  document.getElementById("giohang").innerHTML = "";
  document.getElementById("bill").innerHTML = "";
  dsgh.mangGH = [];
  setLocalStorage();
}
function DanhSachGioHang(){
    this.mangGH = [];

    this.themGH = function(gh){
        this.mangGH.push(gh);
    }
    this.timViTri = function(id){
        var viTri = -1;
        viTri = this.mangGH.findIndex(function(gh){
            return gh.id == id;
        })
        return viTri;
    }
    this.xoaGH = function(id){
        var viTri = this.timViTri(id);
        console.log(viTri);
        if (viTri != -1){
            this.mangGH.splice(viTri,1);
        }
    }
}
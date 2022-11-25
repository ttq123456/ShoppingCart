function SanPhamAPI(){
    this.layDanhSachSanPham = function(){
        return axios ({
            method: 'get',
            url: 'https://636a09e0b10125b78fcec083.mockapi.io/Products2'
        });
    }
}
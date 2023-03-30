DROP DATABASE IF EXISTS db_pinterest;
CREATE DATABASE db_pinterest;
USE db_pinterest;


CREATE TABLE nguoi_dung (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    tuoi INTEGER NOT NULL,
    anh_dai_dien VARCHAR(255) NOT NULL
);

CREATE TABLE hinh_anh (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(255) NOT NULL,
    duong_dan VARCHAR(255) NOT NULL,
	mo_ta VARCHAR(255) NOT NULL,
	nguoi_dung_id INTEGER NOT NULL,
    FOREIGN KEY(nguoi_dung_id) REFERENCES nguoi_dung(id)
   
);


CREATE TABLE binh_luan (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INTEGER NOT NULL,
    hinh_id INTEGER NOT NULL,
    ngay_binh_luan TIMESTAMP DEFAULT NOW(),
    noi_dung VARCHAR(255) NOT NULL,
	FOREIGN KEY(hinh_id) REFERENCES hinh_anh(id),
    FOREIGN KEY(nguoi_dung_id) REFERENCES nguoi_dung(id)
    
);

CREATE TABLE luu_anh (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
     nguoi_dung_id INTEGER NOT NULL,
     hinh_id INTEGER NOT NULL,
     ngay_luu TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY(hinh_id) REFERENCES hinh_anh(id),
	FOREIGN KEY(nguoi_dung_id) REFERENCES nguoi_dung(id)
);


INSERT INTO nguoi_dung (email, mat_khau,ho_ten, tuoi, anh_dai_dien ) VALUES ('alex@gmail.com', 'alex12','alex',19,'visualcode'),('kay@gmail.com', 'kay12','kay',19,'visualcode'),('lam@gmail.com', 'lam12','lam',21,'lalaka'),('wow@gmail.com', 'wow12','wow',22,'wowowo'),('zey@gmail.com', 'zey12','zey',23,'afdiow');
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id) 
VALUES   ('eye.jpg','https://i.pinimg.com/564x/57/23/c7/5723c7fc5aa3bc7de114793e51ebd4dc.jpg','yellow','1'),
('boy.jpg','https://i.pinimg.com/236x/a1/67/d1/a167d1f65d812e4dcbaa5160fb3ebfd4.jpg','aphal','2'),
('sence.jpg','https://i.pinimg.com/564x/40/26/81/402681d36ac83020159a4a00e3005dbb.jpg','sen','3'),
('pc.jpg','https://i.pinimg.com/236x/a7/a7/d2/a7a7d2e78d9561fd6a8482431e13d8e6.jpg','scsd','4'),
('rot.jpg','https://i.pinimg.com/236x/b5/ca/3c/b5ca3c1c228bc92aec51ce6c396e5a79.jpg','rotb','5')
;
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung) 
VALUES ('1','5','2022-01-01','haha'),
('2','4','2022-01-03','wow'),
('3','3','2022-01-04','good'),
('4','2','2022-01-05','yeah'),
('5','1','2022-01-06','cool')
;
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES ('1','4','2022-01-09'),
('3','5','2022-01-10'),
('2','3','2022-01-11'),
('5','2','2022-01-12'),
('4','1','2022-01-13')
;





















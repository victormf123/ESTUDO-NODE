create database portal_noticias;
use portal_noticias;
create table noticias(id_noticia int not null primary key auto_increment, titulo varchar(100), noticia text, data_criacao timestamp default current_timestamp);
show tables;
select * from noticias;
insert into noticias(titulo, noticia) values ('titulo na noticia', 'conteudo da noticia');

--  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
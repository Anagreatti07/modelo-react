import { Alert, Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditaFilme() {

    const{id}=useParams();

    console.log(id);

    const[descricao, setDescricao] = useState("");
    const[ano, setAno] = useState("");
    const[titulo, setTitulo]= useState(""); 
    const[duracao, setDuracao]= useState("");
    const[categoria, setCategoria]= useState("");
    const[imagem, setImagem]= useState("");
    const[editar, setEditar]= useState(false);
    const[erro, setErro]= useState(false);

    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKEND + "filmes/" + id,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then( ( resposta ) => resposta.json() )
        .then( (json ) => {
            if(!json.status){
           setTitulo(json.titulo);
           setDescricao(json.descricao);
           setAno(json.ano);
           setDuracao(json.duracao);
           setCategoria(json.categoria);
           setImagem(json.imagem);
            } else{
                setErro("Filme não encontrado");
            }     

        })
        .catch( (erro) => setErro( true ) );
    },[]);

    function Editar(evento){
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "filmes",{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id:id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    categoria: categoria,
                    imagem: imagem

                }
            )
        })
        .then( ( resposta ) => resposta.json() )
        .then( (json ) => {

            if( json._id ) {
                setEditar( true );
                setErro( false );
            } else {
                setEditar( "Não foi possivel editar o filme");
                setErro( true );
            }

        })
        .catch( (erro) => setErro( true ) );
    }

   

  return (
    <Container component="section" maxWidth="sm">
        <Box sx={{
            mt:10,
            backgroundColor: "#EDEDED",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Typography component="h1" variant='h5'>Editar filme</Typography>
            {erro && (<Alert severity="warning" sx={{mt: 2, mb:2}}>{erro}</Alert>)}
            {editar &&(<Alert severity="success" sx={{mt: 2, mb:2}}>Filme editado com sucesso</Alert>)}
           
            <Box component="form" onSubmit={Editar} >
                <TextField
                type="text" 
                label="Titulo" 
                variant="filled" 
                margin="normal"
                value={titulo}
                onChange={ (e) => setTitulo( e.target.value ) } 
                fullWidth
                />
                <TextField 
                type="text" 
                label="Descrição" 
                variant="filled" 
                margin="normal"
                value={descricao}
                onChange={ (e) => setDescricao( e.target.value ) } 
                fullWidth
                />
                 <TextField 
                type="text" 
                label="Ano" 
                variant="filled" 
                margin="normal" 
                value={ano}
                onChange={ (e) => setAno( e.target.value ) } 
                fullWidth
                />
                <TextField
                type="text" 
                label="Duração" 
                variant="filled" 
                margin="normal"
                value={duracao}
                onChange={ (e) => setDuracao( e.target.value ) } 
                fullWidth
                />
                 <TextField
                type="text" 
                label="Categoria" 
                variant="filled" 
                margin="normal"
                value={categoria}
                onChange={ (e) => setCategoria( e.target.value ) } 
                fullWidth
                />
                <TextField
                type="text" 
                label="Imagem" 
                variant="filled" 
                margin="normal"
                value={imagem}
                onChange={ (e) => setImagem( e.target.value ) } 
                fullWidth
                />
               
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb:2}}>Editar</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default EditaFilme
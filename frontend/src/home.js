import React, { useState, useEffect, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    AppBar, Toolbar, Typography, Avatar, Container,
    Card, CardContent, CardMedia, Grid, TableContainer,
    Table, TableBody, TableHead, TableRow, TableCell,
    Button, CircularProgress, Box, Fade, Zoom, Slide, Grow
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import CloudUpload from '@material-ui/icons/CloudUpload';
import axios from 'axios';

import backgroundImage from "./bg.png";

// Styles avec animations CSS pures
const useStyles = makeStyles((theme) => ({
    appbar: {
        background: 'linear-gradient(135deg, #1A531A 0%, #2E7D32 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        color: 'white',
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: theme.spacing(2),
        animation: '$floatAnimation 3s ease-in-out infinite',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        border: '3px solid white',
    },
    mainContainer: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: "calc(100vh - 64px)",
        padding: theme.spacing(6, 0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        padding: theme.spacing(4, 2),
    },
    imageCard: {
        margin: "auto",
        maxWidth: 500,
        minHeight: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.2)',
        },
    },
    media: {
        height: 350,
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    dropzoneContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
    },
    dropzone: {
        border: '3px dashed #4CAF50',
        borderRadius: '20px',
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderColor: '#2E7D32',
            animation: '$pulseAnimation 2s infinite',
        },
    },
    dropzoneIcon: {
        fontSize: 60,
        color: '#4CAF50',
        marginBottom: theme.spacing(2),
        animation: '$floatAnimation 3s ease-in-out infinite',
    },
    detail: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        background: 'linear-gradient(135deg, #f8fff8 0%, #ffffff 100%)',
    },
    resultCard: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%)',
        borderRadius: '20px',
        padding: theme.spacing(3),
        boxShadow: '0 10px 30px rgba(76, 175, 80, 0.1)',
        border: '1px solid rgba(76, 175, 80, 0.2)',
        width: '100%',
    },
    tableContainer: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        width: '100%',
    },
    tableCell: {
        fontSize: '16px',
        color: '#1A531A !important',
        fontWeight: 'bold',
        padding: theme.spacing(2),
        borderBottom: '2px solid rgba(26, 83, 26, 0.1)',
    },
    confidenceBadge: {
        background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '50px',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: '$shimmerAnimation 2s infinite',
        },
    },
    loader: {
        color: '#4CAF50',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            borderRadius: '50%',
            border: '3px solid rgba(76, 175, 80, 0.1)',
            animation: '$pulseAnimation 1.5s infinite',
        },
    },
    title: {
        fontWeight: 700,
        letterSpacing: '0.5px',
    },
    buttonGrid: {
        maxWidth: "400px",
        width: "100%",
        paddingTop: theme.spacing(4),
    },
    // Keyframes CSS
    '@keyframes floatAnimation': {
        '0%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
        '100%': { transform: 'translateY(0px)' },
    },
    '@keyframes pulseAnimation': {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.02)' },
        '100%': { transform: 'scale(1)' },
    },
    '@keyframes shimmerAnimation': {
        '0%': { backgroundPosition: '-200px 0' },
        '100%': { backgroundPosition: '200px 0' },
    },
}));

// Bouton stylisé
const ClearButton = withStyles((theme) => ({
    root: {
        color: '#FFFFFF',
        background: 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)',
        borderRadius: "50px",
        padding: "15px 30px",
        fontSize: "16px",
        fontWeight: 600,
        boxShadow: '0 8px 20px rgba(56, 142, 60, 0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 25px rgba(56, 142, 60, 0.4)',
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.7s',
        },
        '&:hover:before': {
            left: '100%',
        },
    },
}))(Button);

const ImageUpload = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const LOGO_PATH = "/agriscan_logo.jpg";

    let confidence = 0;

    const clearData = useCallback(() => {
        setData(null);
        setImageLoaded(false);
        setSelectedFile(null);
        setPreview(null);
        setIsLoading(false);
    }, []);

    const sendFile = useCallback(async () => {
        if (!selectedFile) return;

        let formData = new FormData();
        formData.append("file", selectedFile);
        
        try {
            let res = await axios({
                method: "post",
                url: process.env.REACT_APP_API_URL,
                data: formData,
            });

            if (res.status === 200 && isMounted) {
                setData(res.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête:", error);
            if (isMounted) {
                setData({ class: "Erreur de connexion/serveur", confidence: 0 });
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
    }, [selectedFile, isMounted]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!preview) {
            return;
        }
        setIsLoading(true);
        setImageLoaded(true);
        sendFile();
    }, [preview, sendFile]);

    useEffect(() => {
        return () => {
            setIsMounted(false);
        };
    }, []);

    const onSelectFile = (files) => {
        if (!files || files.length === 0) {
            clearData();
            return;
        }
        setSelectedFile(files[0]);
        setData(null);
    };

    if (data && data.confidence) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                        <Avatar src={LOGO_PATH} className={classes.logo} />
                    </Zoom>
                    <Slide in={true} direction="right" timeout={500}>
                        <Typography className={classes.title} variant="h5" noWrap>
                            GremahTech | AgriScan Niger
                        </Typography>
                    </Slide>
                </Toolbar>
            </AppBar>

            <Container 
                maxWidth={false} 
                className={classes.mainContainer} 
                disableGutters={true}
            >
                <Grid
                    className={classes.gridContainer}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <Grid item xs={12} md={8} lg={6}>
                        <Grow in={true} timeout={800}>
                            <Card className={classes.imageCard}>
                                {imageLoaded ? (
                                    <Fade in={imageLoaded} timeout={500}>
                                        <div>
                                            <CardMedia
                                                className={classes.media}
                                                image={preview}
                                                component="img"
                                                title="Image à analyser"
                                            />
                                        </div>
                                    </Fade>
                                ) : (
                                    <CardContent className={classes.dropzoneContainer}>
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            dropzoneText={
                                                <Box textAlign="center">
                                                    <CloudUpload className={classes.dropzoneIcon} />
                                                    <Typography variant="h6" color="primary" gutterBottom>
                                                        Glissez et déposez l'image ici
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        ou cliquez pour parcourir vos fichiers
                                                    </Typography>
                                                </Box>
                                            }
                                            onChange={onSelectFile}
                                            filesLimit={1}
                                            showPreviews={false}
                                            showPreviewsInDropzone={false}
                                            dropzoneClass={classes.dropzone}
                                            dropzoneParagraphClass={classes.dropzoneText}
                                        />
                                    </CardContent>
                                )}
                                
                                {(data || isLoading) && (
                                    <CardContent className={classes.detail}>
                                        {isLoading ? (
                                            <Fade in={isLoading} timeout={300}>
                                                <Box display="flex" flexDirection="column" alignItems="center" py={6}>
                                                    <CircularProgress className={classes.loader} size={80} thickness={4} />
                                                    <Typography variant="h6" style={{ marginTop: 20, color: '#4CAF50' }}>
                                                        Analyse en cours...
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
                                                        Veuillez patienter
                                                    </Typography>
                                                </Box>
                                            </Fade>
                                        ) : (
                                            <Fade in={!!data} timeout={500}>
                                                <div className={classes.resultCard}>
                                                    <Typography variant="h5" gutterBottom align="center" style={{ color: '#1A531A', marginBottom: 30 }}>
                                                        📊 Résultats de l'analyse
                                                    </Typography>
                                                    <TableContainer className={classes.tableContainer}>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell className={classes.tableCell}>Diagnostic</TableCell>
                                                                    <TableCell align="right" className={classes.tableCell}>Fiabilité</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell className={classes.tableCell}>
                                                                        <Typography variant="h6" style={{ color: '#2E7D32' }}>
                                                                            {data.class}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Box className={classes.confidenceBadge}>
                                                                            {confidence}%
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </Fade>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        </Grow>
                    </Grid>
                    
                    {(data || imageLoaded) && (
                        <Grid item className={classes.buttonGrid}>
                            <Fade in={!!data || imageLoaded} timeout={800}>
                                <ClearButton
                                    variant="contained"
                                    component="span"
                                    size="large"
                                    onClick={clearData}
                                    startIcon={<Clear />}
                                    fullWidth
                                >
                                    Nouvelle Analyse
                                </ClearButton>
                            </Fade>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default ImageUpload;  // Export par défaut
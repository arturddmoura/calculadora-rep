import React, { useState } from 'react';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Modal from '@mui/material/Modal';

import { DataGrid } from '@mui/x-data-grid';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const datagridSx = {
    '& .MuiDataGrid-virtualScrollerRenderZone': {
        '& .MuiDataGrid-row': {
            '&:nth-child(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
        },
    },
    '& .MuiDataGrid-columnSeparator': {
        visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#002884',
        color: 'white',
    },
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 5,
    height: 400,
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function App() {
    const [agua, setAgua] = useState('');
    const [luz, setLuz] = useState('');
    const [gastosValue, setGastosValue] = useState('');
    const [iptu, setIPTU] = useState(true);

    const [aguaIndividual, setAguaInd] = useState('');
    const [iptuIndividual, setIptuInd] = useState('');
    const [luzIndividual, setLuzInd] = useState('');
    const [gastosIndividual, setGastosInd] = useState('');
    const [luzArtur, setLuzArtur] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [success, setSuccess] = useState(false);
    const [gastos, setGastos] = useState(false);

    const columns = [
        {
            field: 'nome',
            headerName: 'Nome',
            width: 100,
            editable: true,
            sortable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) =>
                `${
                    formatter.format(
                        Math.ceil(
                            params.row.aluguel +
                                params.row.luz +
                                params.row.iptu +
                                params.row.agua +
                                params.row.internet +
                                params.row.produtos +
                                params.row.gastos
                        )
                    ) || ''
                }`,
        },
        {
            field: 'aluguel',
            headerName: 'Aluguel',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'luz',
            headerName: 'Luz',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'iptu',
            headerName: 'IPTU e Lixo',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'agua',
            headerName: 'Água',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'internet',
            headerName: 'Internet',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'produtos',
            headerName: 'Produtos',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'gastos',
            headerName: 'Gastos Extras',
            width: 120,
            editable: true,
            sortable: false,
        },
    ];

    const rows = [
        {
            id: 1,
            nome: 'Artur',
            luz: Math.ceil(luzArtur),
            aluguel: 340,
            iptu: Math.ceil(iptuIndividual),
            agua: Math.ceil(aguaIndividual),
            internet: 24,
            produtos: 20,
            gastos: Math.ceil(gastosIndividual),
        },
        {
            id: 2,
            nome: 'Denys',
            luz: Math.ceil(luzIndividual),
            aluguel: 220,
            iptu: Math.ceil(iptuIndividual),
            agua: Math.ceil(aguaIndividual),
            internet: 24,
            produtos: 20,
            gastos: Math.ceil(gastosIndividual),
        },
        {
            id: 3,
            nome: 'Macquiden',
            luz: Math.ceil(luzIndividual),
            aluguel: 220,
            iptu: Math.ceil(iptuIndividual),
            agua: Math.ceil(aguaIndividual),
            internet: 24,
            produtos: 20,
            gastos: Math.ceil(gastosIndividual),
        },
        {
            id: 4,
            nome: 'Pedro',
            luz: Math.ceil(luzIndividual),
            aluguel: 220,
            iptu: Math.ceil(iptuIndividual),
            agua: Math.ceil(aguaIndividual),
            internet: 24,
            produtos: 20,
            gastos: Math.ceil(gastosIndividual),
        },
        {
            id: 5,
            nome: 'Netinho',
            luz: Math.ceil(luzIndividual),
            aluguel: 200,
            iptu: Math.ceil(iptuIndividual),
            agua: Math.ceil(aguaIndividual),
            internet: 24,
            produtos: 20,
            gastos: Math.ceil(gastosIndividual),
        },
    ];
    function handleSubmit(res) {
        setAguaInd(agua / 5);

        if (iptu === true) {
            setIptuInd(20);
        } else if (iptu !== true) {
            setIptuInd(5);
        }

        if (luz / 5 <= 60) {
            setLuzInd(luz / 5);
            setLuzArtur(luz / 5);
        } else if (luz / 5 >= 60) {
            setLuzInd(60);
            setLuzArtur(luz - 240);
        }

        if (gastos === true) {
            setGastosInd(gastosValue / 5);
        } else if (gastos !== true) {
            setGastosInd(0);
        }

        setSuccess(true);
        setOpen(true);
    }

    return (
        <Box textAlign="center" justifyContent="center" alignItems="center" noValidate autoComplete="off">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '50vh' }}
            >
                <Paper style={{ padding: '50px' }} variant="outlined" elevation={8}>
                    <Box m={1} pt={1}>
                        <Typography style={{ paddingBottom: '30px' }} variant="h4">
                            Calculadora de Contas
                        </Typography>
                    </Box>
                    <TextField
                        style={{ padding: '5px' }}
                        id="standard-basic"
                        label="Quanto foi a luz?"
                        type="number"
                        inputProps={{ inputMode: 'numeric' }}
                        variant="standard"
                        onChange={(res) => setLuz(res.target.value)}
                    />
                    <TextField
                        style={{ padding: '5px' }}
                        id="standard-basic"
                        label="Quanto foi a água?"
                        variant="standard"
                        inputProps={{ inputMode: 'numeric' }}
                        type="number"
                        onChange={(res) => setAgua(res.target.value)}
                    />
                    <p></p>
                    <FormGroup>
                        <FormControlLabel
                            style={{ padding: '5px' }}
                            labelPlacement="top"
                            control={<Switch defaultChecked />}
                            onChange={(res) => setIPTU(res.target.checked)}
                            label="Pagaremos IPTU?"
                        />
                        <FormControlLabel
                            style={{ padding: '5px' }}
                            labelPlacement="top"
                            control={<Switch />}
                            onChange={(res) => setGastos(res.target.checked)}
                            label="Houve gastos extras?"
                        />
                        {gastos ? (
                            <TextField
                                style={{ padding: '5px' }}
                                id="standard-basic"
                                label="Qual o valor dos gastos?"
                                type="number"
                                variant="standard"
                                onChange={(res) => setGastosValue(res.target.value)}
                            />
                        ) : (
                            <div></div>
                        )}
                    </FormGroup>

                    <Box m={1} pt={1}>
                        <Button onClick={handleSubmit} variant="contained">
                            Calcular
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            {success ? (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <DataGrid
                            disableColumnMenu
                            disableColumnFilter
                            disableColumnSelector
                            sx={datagridSx}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </Modal>
            ) : (
                <div></div>
            )}
        </Box>
    );
}

export default App;

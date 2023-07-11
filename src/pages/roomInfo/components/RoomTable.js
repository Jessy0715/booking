import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  tableCellClasses,
} from "@mui/material";
import roomImg1 from "@/assets/image/room1.jpg";
import roomImg2 from "@/assets/image/room2.jpg";
import { useStyles } from "../../../bookingStyle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Table 相關組件: TableContainer, Table, TableHead, TableBody, TableRow, TableCell, tableCellClasses

const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}
const rows = [createData("場地清潔費", 2000, 1500, 2500)];

const RoomTable = () => {
  const classes = useStyles();
  const data = [
    {
      id: 1,
      backgroundImage: `url(${roomImg1})`,
      title: "普101館",
      desc: "1樓，階梯教室，空間可容納 302 人。",
      price: [
        {
          morning: "2000",
          afternoon: "2500",
          night: "3500",
        },
      ],
    },
    {
      id: 2,
      backgroundImage: `url(${roomImg2})`,
      title: "普102館",
      desc: "2樓，階梯教室，空間可容納 400 人。",
      price: [
        {
          morning: "2000",
          afternoon: "2500",
          night: "4000",
        },
      ],
    },
  ];
  return (
    <>
      <Paper component="main" elevation={0} sx={{ backgroundColor: '#E5E5E5' }} >
        <Grid container direction="column" justifyContent="flex-start">
          {data.map((el) => {
            const { id, backgroundImage, title, desc, price } = el;
            return (
              <Paper
                key={id}
                elevation={0}
                component="section"
                square
                sx={{ marginBottom: "50px", minWidth: "80vw", marginX: "auto", backgroundColor: "#fff", padding: "20px" }}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="stretch"
                  wrap="nowrap"
                >
                  <Box
                    sx={{
                      backgroundImage: backgroundImage,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      marginRight: "30px",
                      width: "300px",
                      height: "185px",
                    }}
                  />
                  <Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Box>
                        <Grid container alignItems="center">
                          <ArrowRightIcon fontSize="large" color="secondary" />
                          <Typography variant="subtitle2">{title}</Typography>
                        </Grid>
                        <Box sx={{ fontSize: "14px" }} className={classes.pd}>
                          {desc}
                        </Box>
                      </Box>
                      <Box>
                        <Button variant="outlined">前往預約</Button>
                      </Box>
                    </Grid>
                    <Box>
                      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E5E5" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead >
                            <TableRow>
                              <StyledHeaderTableCell>時段</StyledHeaderTableCell>
                              <StyledHeaderTableCell>
                                上午 09:00 - 12:00
                              </StyledHeaderTableCell>
                              <StyledHeaderTableCell>
                                下午 13:00 -15:00
                              </StyledHeaderTableCell>
                              <StyledHeaderTableCell>
                                晚上 18:00 - 22:00
                              </StyledHeaderTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td": {
                                    borderRight: 1,
                                    borderRightColor: "#E5E5E5"
                                  },
                                }}
                              >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.fat}</TableCell>
                                <TableCell>{row.carbs}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Paper>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default RoomTable;

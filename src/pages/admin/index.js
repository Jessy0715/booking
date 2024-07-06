import Header from "@/components/Header";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  InputAdornment,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  tableCellClasses,
  ImageListItem,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const json = {
  login: {
    account: "",
    password: "",
  },
  register: {
    account: "",
    password: "",
  },
  spaceList: [
    {
      id: "",
      roomImg: "",
      title: "",
      desc: "",
      price: {
        morning: "",
        afternoon: "",
        night: "",
      },
    },
  ],
  calendarList: [
    {
      date: "",
      type: "",
      eventName: "",
      eventLocation: "",
      name: "",
    },
  ],
  rentForm: {
    rentSpace: "",
    rentReason: "",
  },
  rentSpace_options: [],
  filterWords: "",
  addForm: {
    id: "",
    roomImg: "",
    title: "",
    desc: "",
    price: {
      morning: "",
      afternoon: "",
      night: "",
    },
  },
  editForm: {
    roomImg: "",
    title: "",
    desc: "",
    price: {
      morning: "",
      afternoon: "",
      night: "",
    },
  },
};
const jsonVal = {
  login: {
    account: "test",
    password: "##Test123",
  },
  register: {
    account: "test",
    password: "##Test123",
  },
  spaceList: [
    {
      id: "",
      roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "普101館",
      desc: "1樓，階梯教室，空間可容納 302 人。",
      price: {
        morning: "1000",
        afternoon: "2000",
        night: "3000",
      },
    },
  ],
  calendarList: [
    {
      date: "2024-07-01",
      type: "warning",
      eventName: "團隊會議",
      eventLocation: "普101館",
      name: "林小明",
    },
    {
      date: "2024-07-02",
      type: "default",
      eventName: "客戶會議",
      eventLocation: "普101館",
      name: "林小明",
    },
  ],
  rentForm: {
    rentSpace: "101",
    rentReason: "辦理競賽",
  },
  rentSpace_options: [
    {
      label: "普101館",
      value: "101",
    },
  ],
  filterWords: "普101",
  addForm: {
    id: "",
    roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "普101館",
    desc: "1樓，階梯教室，空間可容納 302 人。",
    price: {
      morning: "1000",
      afternoon: "2000",
      night: "3000",
    },
  },
  editForm: {
    id: "123",
    roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "普101館",
    desc: "1樓，階梯教室，空間可容納 302 人。",
    price: {
      morning: "1000",
      afternoon: "2000",
      night: "3000",
    },
  },
};

const tableInfo = [
  {
    smImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "普101館",
    desc: "1樓，階梯教室，空間可容納 302 人。",
    price: [
      {
        morning: "1000",
        afternoon: "2000",
        night: "3000",
      },
    ],
  },
  {
    smImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "普102館",
    desc: "1樓，階梯教室，空間可容納 302 人。",
    price: [
      {
        morning: "1000",
        afternoon: "2000",
        night: "3000",
      },
    ],
  },
];

const Admin = () => {
  const [filter, setFilter] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tableData, setTableData] = useState(tableInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropImgModalOpen, setCropImgModalOpen] = useState(false);
  const cropperRef = useRef(null);
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
    price: {
      morning: "",
      afternoon: "",
      night: "",
    },
  });

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // const croppedCanvas = cropper.getCroppedCanvas();
      // setSelectedImage(croppedCanvas.toDataURL());
      // setCropImgModalOpen(false);

      cropper.getCroppedCanvas().toBlob((blob) => {
        // base64 => Blob
        const croppedImageUrl = URL.createObjectURL(blob);
        console.log(croppedImageUrl, "croppedImageUrl");
        setSelectedImage(croppedImageUrl);
        setCropImgModalOpen(false);
      });
    }
  };

  const handleThumbnailClick = () => {
    setCropImgModalOpen(true);
  };

  const handleThumbnailClose = () => {
    setCropImgModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 处理行选择的切换
  const handleCheckboxChange = (index) => {
    const updatedData = tableData.map((row, i) =>
      i === index ? { ...row, isSelected: !row.isSelected } : row
    );
    setTableData(updatedData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("price.")) {
      const key = name.split(".")[1];
      setFormValues((prevState) => ({
        ...prevState,
        price: {
          ...prevState.price,
          [key]: value, // 動態更新 price 中的特定屬性
        },
      }));
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ maxWidth: "80vw", marginX: "auto", mt: 3, pr: 3 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 6 }}
        >
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <ArrowRightIcon fontSize="large" color="primary" />
              <Typography variant="subtitle1">後臺管理系統</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Link to="/roomReserve">
              <span style={{ textDecoration: "underline" }}>前往月曆查看</span>
            </Link>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            container
            item
            xs={8}
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <TextField
                label="搜尋"
                placeholder="請搜尋場地名稱"
                variant="outlined"
                size="small"
                value={filter}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained">搜尋</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleEdit}>
              新增
            </Button>
            <Button variant="outlined">批次刪除</Button>
          </Grid>
        </Grid>
        <Box>
          <TableContainer sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>選擇</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>場地照片</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>場地名稱</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>場地說明</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>場地費用</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ fontWeight: "bold" }}>操作</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        checked={row.isSelected}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <ImageListItem key={row.smImg}>
                        <img
                          src={`${row.smImg}?w=20&auto=format`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell>
                      <p>上午：NT$ {row.price[0].morning}</p>
                      <p>下午：NT$ {row.price[0].afternoon}</p>
                      <p>晚上：NT$ {row.price[0].night}</p>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ mb: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={handleEdit}
                        >
                          編輯
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          刪除
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* crop 照片 */}
      <Dialog
        open={cropImgModalOpen}
        onClose={handleThumbnailClose}
        maxWidth="md"
      >
        <DialogTitle>裁剪照片</DialogTitle>
        <DialogContent>
          {/* <Box
            component="img"
            src={selectedImage}
            alt="查看的照片"
            sx={{ width: "50%", height: "auto" }}
          /> */}
          {selectedImage && (
            <Cropper
              src={selectedImage}
              style={{ height: 400, width: "50%" }}
              // Cropper.js options
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
              dragMode="move"
              scalable={true}
              cropBoxResizable={true}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleThumbnailClose}
            color="secondary"
          >
            取消
          </Button>
          <Button onClick={handleCrop} color="primary" variant="contained">
            完成裁剪
          </Button>
        </DialogActions>
      </Dialog>
      {/* 新增/編輯場地列表跳窗 */}
      <Dialog open={isModalOpen} onClose={handleCancel}>
        <DialogTitle id="alert-dialog-title">編輯場地列表</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  場地照片
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleButtonClick}
                  >
                    上傳照片
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2, visibility: "hidden" }}>
                  隱藏文字
                </Grid>
                <Grid item>
                  {selectedImage && (
                    <Box
                      component="img"
                      src={selectedImage}
                      alt="照片"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        border: "1px solid #ddd",
                        cursor: "pointer",
                      }}
                      onClick={handleThumbnailClick}
                    />
                  )}
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Grid>
              </Grid>
              {/* <TextField
                size="small"
                variant="outlined"
                name="image"
                value={selectedFile ? selectedFile.name : ""}
                fullWidth
              /> */}
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  場地名稱
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  場地說明
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="desc"
                    value={formValues.desc}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box>場地費用</Box>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  上　　午
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="price.morning"
                    value={formValues.price.morning}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  下　　午
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="price.afternoon"
                    value={formValues.price.afternoon}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 2 }}>
                  晚　　上
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="price.night"
                    value={formValues.price.night}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button size="small" onClick={handleCancel} variant="outlined">
            取消
          </Button>
          <Button
            size="small"
            onClick={handleCancel}
            autoFocus
            variant="contained"
          >
            儲存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Admin;

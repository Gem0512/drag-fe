
import React from "react";
import { useDrag } from "react-dnd";
import "../css/Element.css"
import LabelIcon from '@mui/icons-material/Label';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PinIcon from '@mui/icons-material/Pin';
import IsoIcon from '@mui/icons-material/Iso';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

function Element({ id, type, text, handleAddItemDropItemDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
    className="hightlight"
      ref={drag}
      style={{
        // border: isDragging ? "2px solid pink" : "0px",
        // cursor: "move",
        // // height:"100px",
        // paddingLeft: "20%",
        display:"flex",
        justifyContent:"center",
        // width:"auto",
       
      }}
    >
     {type === "input" && 
      <div
      style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
      }}>
        <BorderColorIcon></BorderColorIcon>
        <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
      </div>
     }
     {type === "label" && 
     
        <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <LabelIcon></LabelIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>
      }
     
      {type === "textarea" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <DocumentScannerIcon></DocumentScannerIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>
      }

      {type === "checkbox" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <CheckBoxIcon></CheckBoxIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        } 

        {type === "number" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <PinIcon></PinIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        } 

        {type === "calculated" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <IsoIcon></IsoIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        } 

        {type === "radio" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <RadioButtonCheckedIcon></RadioButtonCheckedIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        } 


        {type === "attachfile" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <AttachFileIcon></AttachFileIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        }

        {type === "link" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <PublicIcon></PublicIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        }


        {type === "table" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <BackupTableIcon></BackupTableIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        }

        {type === "date" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <CalendarMonthIcon></CalendarMonthIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        } 

        {type === "time" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <AccessTimeFilledIcon></AccessTimeFilledIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        }

        {type === "drop" && 
      <div style={{
          display:"flex",
          paddingTop:"2px",
          margin:"10px",
          height:"30px",
          width:"150px",
          paddingLeft:"10px",
          backgroundImage: "url(	https://static-y.kintone.com/contents/k/image/argo/app/admin/form/settingtile_20160601.png)"
        }}>
            <ArrowDropDownCircleIcon></ArrowDropDownCircleIcon>
            <p
            style={{
              marginTop:"0px",
              paddingLeft:"5px"
            }}>{text}</p>
        </div>     
        }
     
    </div>
  );
}

export default Element;

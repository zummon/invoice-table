import "./style.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"), props: {
    data: {
      "": {
        "": "English",
        "label": {
          "": {
            "reset": "Reset",
            "save": "Save",
            "print": "Preview / Print",
            "add": "Add",
            "delete": "Delete",
            "title": "Invoice",
            "ref": "No",
            "date": "Date",
            "duedate": "Due Date",
            "client": "Bill to",
            "clientid": "Taxpayer iD",
            "paymethod": "Payment",
            "itemNo": "No",
            "itemDesc": "Description",
            "itemPrice": "Price",
            "itemQty": "Qty",
            "itemAmount": "Amount",
            "itemUnit": "Unit",
            "totalAmount": "Subtotal",
            "totalVat": "Vat",
            "totalWht": "Tax withheld",
            "totalAdjust": "Adjust",
            "totalFinal": "Pay Amount",
            "note": "Note",
            "vendorSign": "Vendor Signature",
            "clientSign": "Client Signature"
          },
          "quotation": {
            "title": "Quotation",
            "duedate": "Offer Until",
            "client": "Offer to"
          },
          "receipt": {
            "title": "Receipt",
            "client": "Received from",
            "totalFinal": "Paid Amount",
            "vendorSign": "Receiver Signature"
          },
          "tax-invoice": {
            "title": "Tax Invoice"
          }
        },
        "q": {
          "lang": "",
          "doc": "",
          "currency": "Dollar",
          "vendorLogo": "",
          "ref": "",
          "date": "",
          "duedate": "",
          "vendorName": "Vendor Name",
          "vendorid": "Register",
          "vendorAddress": "Address",
          "clientName": "Client Name",
          "clientid": "0000000000000",
          "clientAddress": "Address",
          "paymethod": "",
          "itemDesc": ["", "", "", "", ""],
          "itemPrice": ["", "", "", "", ""],
          "itemQty": ["", "", "", "", ""],
          "itemUnit": ["", "", "", "", ""],
          "vatRate": "0.05",
          "whtRate": "0",
          "totalAdjust": "",
          "note": ""
        },
        "itemsDesc": [],
        "itemsUnit": []
      },
      "th": {
        "": "ภาษาไทย",
        "label": {
          "": {
            "reset": "ล้าง",
            "save": "บันทึก",
            "print": "ดูตัวอย่าง / พิมพ์",
            "add": "เพิ่ม",
            "delete": "ลบ",
            "title": "ใบแจ้งหนี้",
            "ref": "เลขที่",
            "date": "วันที่",
            "duedate": "ชำระภายใน",
            "client": "ส่งถึง",
            "clientid": "เลขประจำตัวผู้เสียภาษี",
            "paymethod": "วิธีชำระเงิน",
            "itemNo": "ลำดับ",
            "itemDesc": "รายการสินค้า",
            "itemPrice": "ราคา/หน่วย",
            "itemQty": "จำนวน",
            "itemAmount": "จำนวนเงิน",
            "itemUnit": "หน่วยนับ",
            "totalAmount": "รวม",
            "totalVat": "ภาษีมูลค่าเพิ่ม",
            "totalWht": "หัก ณ ที่จ่าย",
            "totalAdjust": "ปรับปรุง",
            "totalFinal": "ยอดชำระ",
            "note": "หมายเหตุ",
            "vendorSign": "ลายเซ็นผู้ขาย",
            "clientSign": "ลายเซ็นผู้ซื้อ"
          },
          "quotation": {
            "title": "ใบเสนอราคา",
            "duedate": "สั่งซื้อก่อนวันที่",
            "client": "ส่งถึง"
          },
          "receipt": {
            "title": "ใบเสร็จรับเงิน",
            "client": "รับเงินจาก",
            "totalFinal": "ยอดชำระ",
            "vendorSign": "ลายเซ็นผู้รับเงิน"
          },
          "tax-invoice": {
            "title": "ใบกำกับภาษี"
          }
        },
        "q": {
          "lang": "th",
          "doc": "",
          "currency": "บาท",
          "vendorLogo": "",
          "ref": "",
          "date": "",
          "duedate": "",
          "vendorName": "ชื่อผู้ขาย",
          "vendorid": "เลขประจำตัว",
          "vendorAddress": "ที่อยู่",
          "clientName": "ชื่อลูกค้า",
          "clientid": "0000000000000",
          "clientAddress": "ที่อยู่",
          "paymethod": "",
          "itemDesc": ["", "", "", "", ""],
          "itemPrice": ["", "", "", "", ""],
          "itemQty": ["", "", "", "", ""],
          "itemUnit": ["", "", "", "", ""],
          "vatRate": "0.07",
          "whtRate": "0",
          "totalAdjust": "",
          "note": ""
        },
        "itemsDesc": [
          "บล็อก/กระเบื้องคอนกรีต ติดตั้งบนทราย (ไม่รวมทราย)",
          "กระเบื้องคอนกรีต ติดตั้งบนคอนกรีต (รวมปูนทราย 3 ซม.)",
          "ขอบคันหินใหญ่ พร้อมติดตั้ง",
          "ขอบคันหินเล็ก พร้อมติดตั้ง",
          "ขอบคันหินตกแต่ง พร้อมติดตั้ง",
          "LXP LS ค่าบ่อพัก",
          "LXP LS ค่าน้ำยาประสานทราย",
          "เครีย / ปรับพื้นที่ ปรับระดับดิน",
          "ก่อขอบ",
          "วางขอบ คันหินเล็ก ขนาด 11x20x50 cm.",
          "ลงน้ำยาประสานทราย SCG",
          "กรณี วางขอบ กระดูกงู (ขอบตกแต่งอิสระ)",
          "ก่อเสริมขอบบ่อพักลูกเล็ก",
          "กรณีตัดเศษบล็อกด้วยไฟเบอร์",
          "ขนเศษวัสดุไปทิ้งนอกสถานที่",
          "ผ้าใยสังเคราะห์ ขนาด 2x4 เมตร",
          "ขอบคันหินเล็ก ขนาด 11x20x50 cm ข้างรั้วฝั่งที่จอดรถ",
          "บล็อก",
          "น้ำยาประสานทราย scg 5 ลิตร",
          "ทรายหยาบ",
          "ทรายละเอียด",
          "ปูนซีเมนต์",
          "อิฐมอญ"
        ],
        "itemsUnit": [
          "เมตร",
          "บ่อ",
          "ตร.ม.",
          "เหมา",
          "ตารางเมตร",
          "เที่ยวละ",
          "ผืน",
          "ท่อน",
          "แกลอน",
          "รถ",
          "ถุง",
          "ก้อน"
        ]
      }
    }
  }
});

export default app;

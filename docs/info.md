# QuotationV3 🚀

A modern quotation management module that allows users to create quotations, add multiple items, edit records, view quotation history, sort by latest activity, and print quotations.

---

# ✨ Features

- Create a new quotation
- Add multiple quotation items
- Edit quotation header information
- Edit/Delete quotation items
- View all quotations
- View quotations ordered by latest activity
- Print quotation list
- Clean and responsive interface

---

# 📋 Workflow

```
Create Quotation
        │
        ▼
Fill Ledger Details
        │
        ▼
Click Save
        │
        ▼
Add Item Details
        │
        ▼
Save Item
        │
        ▼
Repeat until all items are added
        │
        ▼
Edit/Delete items if required
        │
        ▼
Print or View Quotations
```

---

# 1️⃣ Create Quotation

Click the **Create** button from the header.

This opens the quotation creation screen.

Fill the quotation header information.

| Field | Description |
|--------|-------------|
| LedgerName | Customer/Company Name |
| InvoiceDate | Quotation Date |
| PartyGSTIN | GST Number of Customer |

After entering the details,

Click

> ✅ **Save**

Once saved,

the application automatically redirects to the **Item Entry Screen**.

---

# 2️⃣ Add Item Details

Now you can add quotation items.

Available fields:

| Field | Description |
|--------|-------------|
| ItemName | Product Name |
| Qty | Quantity |
| OrigRate | Original Rate |
| OrigAmount | Original Amount |
| RateInc | Inclusive Rate |
| Amount | Final Amount |

After entering item details,

Click

> ✅ Save

The item is inserted into the quotation.

---

# ➕ Add Multiple Items

Repeat the same process for additional products.

Example

```
Pant
Shirt
Jeans
T-Shirt
Shoes
```

Each click on **Save** adds a new item to the quotation.

The total quantity and amount are automatically calculated.

---

# ✏ Edit Item

If an item was entered incorrectly,

Click

> 🟡 Edit

Modify the values.

Click Save again.

The quotation updates immediately.

---

# 🗑 Delete Item

If an item is unnecessary,

Click

> 🔴 Delete

The selected row is removed.

Totals are recalculated automatically.

---

# ✏ Edit Quotation Header

Need to change

- Ledger Name
- Invoice Date
- GSTIN

Simply click

> 🔵 Edit

Update the information.

Save again.

---

# 📑 Header Menu

The top navigation contains four major actions.

---

## 🆕 Create

Creates a new quotation.

Navigation

```
Header
    │
    ▼
Create
    │
    ▼
Quotation Entry Screen
```

Use this whenever you want to create a fresh quotation.

---

## 📋 ShowAll

Displays every quotation stored in the system.

Shows

- Ledger Name
- Invoice Date
- Party GSTIN

Each row contains

> 👁 View

Clicking **View** opens the complete quotation.

Perfect for browsing previous quotations.

---

## ⬇ Descend

Shows quotations sorted by the most recent activity.

Additional columns include

| Column | Description |
|---------|-------------|
| Qty | Total Quantity |
| Amount | Total Amount |
| TimeSpan | Time since quotation was created |

Example

| TimeSpan |
|----------|
| 2 min ago |
| 10 min ago |
| 1 hour ago |
| 5 hours ago |
| Yesterday |

This helps users quickly identify the latest quotations.

---

## 🖨 Print

Click

> Print

The browser opens the Print Preview window.

Available options

- Save as PDF
- Print to Printer
- Portrait
- Landscape
- Page Selection

Ideal for

- Customer copies
- Office records
- PDF sharing
- Email attachments

---

# 🔄 Complete Workflow

```
Create
   │
   ▼
Enter Ledger Details
   │
   ▼
Save
   │
   ▼
Item Entry
   │
   ▼
Add Item
   │
   ▼
Save
   │
   ├──────────────┐
   ▼              │
Add More Items ◄──┘
   │
   ▼
Edit/Delete Items
   │
   ▼
Edit Header (Optional)
   │
   ▼
ShowAll
   │
   ▼
Descend
   │
   ▼
Print
```

---

# ✅ Summary

QuotationV3 provides a complete quotation management workflow.

✔ Create quotations

✔ Add unlimited items

✔ Edit quotation header

✔ Edit/Delete items

✔ View all quotations

✔ View latest quotations using **Descend**

✔ Track quotation activity using **TimeSpan**

✔ Print or Save as PDF

✔ Clean, fast, and user-friendly interface

---

## 🚀 Version

```
QuotationV3
Version : v18
```

Developed with ❤️ by **KeshavSoft**
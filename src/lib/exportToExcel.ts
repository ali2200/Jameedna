export function exportToCSV(data: Record<string, unknown>[], filename: string, headers: Record<string, string>) {
  if (data.length === 0) return;

  const headerKeys = Object.keys(headers);
  const headerRow = headerKeys.map(key => headers[key]).join(',');
  
  const rows = data.map(item => {
    return headerKeys.map(key => {
      const value = item[key];
      if (value === null || value === undefined) return '';
      const stringValue = String(value).replace(/"/g, '""');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue}"`;
      }
      return stringValue;
    }).join(',');
  });

  const BOM = '\uFEFF';
  const csvContent = BOM + [headerRow, ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const contactsHeaders = {
  id: 'رقم',
  name: 'الاسم',
  email: 'البريد الإلكتروني',
  phone: 'الهاتف',
  company: 'الشركة',
  subject: 'الموضوع',
  message: 'الرسالة',
  isRead: 'تمت القراءة',
  createdAt: 'تاريخ الإرسال',
};

export const quotesHeaders = {
  id: 'رقم',
  name: 'الاسم',
  email: 'البريد الإلكتروني',
  phone: 'الهاتف',
  company: 'الشركة',
  country: 'الدولة',
  product: 'المنتج',
  quantity: 'الكمية',
  message: 'ملاحظات',
  isRead: 'تمت القراءة',
  createdAt: 'تاريخ الطلب',
};

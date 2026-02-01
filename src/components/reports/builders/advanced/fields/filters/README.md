# دليل استخدام الفلاتر المحسنة

## نظرة عامة

تم تحسين نظام الفلاتر لدعم أنواع البيانات المختلفة والعمليات المتقدمة:

### أنواع البيانات المدعومة:
- **time**: التواريخ والأوقات
- **string**: النصوص
- **number**: الأرقام
- **boolean**: القيم المنطقية (صحيح/خطأ)

### العمليات المتاحة حسب نوع البيانات:

#### للتواريخ (time):
- `equals`, `notEquals`: مساوي/غير مساوي لتاريخ محدد
- `gt`, `gte`, `lt`, `lte`: أكبر من/أكبر أو يساوي/أصغر من/أصغر أو يساوي
- `set`, `notSet`: محدد/غير محدد
- `inDateRange`, `notInDateRange`: في نطاق تاريخي/خارج نطاق تاريخي
- `beforeDate`, `afterDate`: قبل تاريخ/بعد تاريخ

#### للأرقام (number):
- `equals`, `notEquals`: مساوي/غير مساوي
- `gt`, `gte`, `lt`, `lte`: أكبر من/أكبر أو يساوي/أصغر من/أصغر أو يساوي
- `set`, `notSet`: محدد/غير محدد

#### للنصوص (string):
- `equals`, `notEquals`: مساوي/غير مساوي
- `contains`, `notContains`: يحتوي على/لا يحتوي على
- `startsWith`, `endsWith`: يبدأ بـ/ينتهي بـ
- `set`, `notSet`: محدد/غير محدد

#### للقيم المنطقية (boolean):
- `equals`, `notEquals`: مساوي/غير مساوي
- `set`, `notSet`: محدد/غير محدد

## أمثلة على الاستخدام:

### 1. تقرير الأوعية المنشأة في تاريخ معين:

```javascript
{
  "measures": ["instance.count"],
  "dimensions": ["instance.title", "instance.hrid"],
  "filters": [
    {
      "member": "instance.creation_date",
      "operator": "equals",
      "values": "2024-01-15"
    }
  ]
}
```

### 2. تقرير الأوعية المنشأة في نطاق تاريخي:

```javascript
{
  "measures": ["instance.count"],
  "dimensions": ["instance.title", "instance.hrid"],
  "filters": [
    {
      "member": "instance.creation_date",
      "operator": "inDateRange",
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    }
  ]
}
```

### 3. تقرير الأوعية النشطة:

```javascript
{
  "measures": ["instance.count"],
  "dimensions": ["instance.title", "instance.hrid"],
  "filters": [
    {
      "member": "instance.discoverysuppress",
      "operator": "equals",
      "values": false
    }
  ]
}
```

### 4. تقرير الأوعية التي تحتوي على كلمة معينة في العنوان:

```javascript
{
  "measures": ["instance.count"],
  "dimensions": ["instance.title", "instance.hrid"],
  "filters": [
    {
      "member": "instance.title",
      "operator": "contains",
      "values": "كتاب"
    }
  ]
}
```

### 5. تقرير المواد التي تم إنشاؤها بعد تاريخ معين:

```javascript
{
  "measures": ["item.count"],
  "dimensions": ["item.barcode", "item.status_name"],
  "filters": [
    {
      "member": "item.creation_date",
      "operator": "afterDate",
      "values": "2024-01-01"
    }
  ]
}
```

## المكونات الجديدة:

### ValueField
مكون ذكي يعرض حقل الإدخال المناسب حسب نوع البيانات:
- **Datepicker** للتواريخ
- **TextField** مع type="number" للأرقام
- **Checkbox** للقيم المنطقية
- **TextField** عادي للنصوص

### DateRangeFilter
مكون مخصص لاختيار نطاق تاريخي يظهر عند اختيار العمليات:
- `inDateRange`
- `notInDateRange`

### OperatorField المحسن
يعرض العمليات المناسبة فقط حسب نوع البيانات المحدد.

## التحسينات المستقبلية المقترحة:

1. **MultiSelection للقيم المتعددة**: لدعم العمليات مثل "in" و "not in"
2. **AutoSuggest للنصوص**: لاقتراح القيم الموجودة
3. **فلاتر متقدمة للمستخدمين**: ربط بجدول المستخدمين
4. **فلاتر الموقع**: ربط بجداول المواقع والمكتبات
5. **حفظ الفلاتر المفضلة**: إمكانية حفظ واستعادة مجموعات الفلاتر

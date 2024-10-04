export interface SalePost {
  id?: number
  cotizacionId: string,
  customerOrderDate: string,
  customerOrder: string,     
  line: string,       
  deliveryTime: string,      
  deliveryDate: string,  
  invoiceNumber: string,    
  paymentType: string,       
  observation: string,       
  paymentMethod: string,     
  startDate: string,         
  dueDate: string,           
  withoutTax: string,        
  withTax:string,           
  detraction: string,        
  netPayable: string,        
  paidAmount: string,        
  totalSalePrice: string,    
  status: string,            
  outstandingAmount: string, 
  supplierOrder: string,     
  advancePayment: string,    
  advanceDate: string,       
  balance: string,          
  balanceDate: string,       
  totalCost: string,         
  supplierInvoice: string,   
  supplierShipment: string,  
  value: string,            
  percentage: string,        
}

export interface SaleGet {
  id: number,
  customerOrderDate: string,
  customerOrder: string,
  quoteCode: string,     
  companyName: string,
  line: string,      
  companyRuc: string, 
  deliveryTime: string,      
  deliveryDate: string,  
  invoiceNumber: string,  
  currencyType: string,  
  paymentType: string,       
  observation: string,       
  paymentMethod: string,
  period: string,     
  startDate: string,         
  dueDate: string,           
  withoutTax: number,        
  withTax:number,           
  detraction: number,        
  netPayable: number,        
  paidAmount: number,        
  totalSalePrice: number,    
  status: string,            
  outstandingAmount: number, 
  supplierOrder: string,     
  advancePayment: number,    
  advanceDate: string,       
  balance: number,          
  balanceDate: string,       
  totalCost: number,         
  supplierInvoice: string,   
  supplierShipment: string,  
  value: number,            
  percentage: number,   
}

export interface SalePut {
  id?: number,
  customerOrderDate: string,
  customerOrder: string,
  line: string,      
  deliveryTime: string,      
  deliveryDate: string,  
  invoiceNumber: string,   
  paymentType: string,       
  observation: string,       
  paymentMethod: string, 
  startDate: string,         
  dueDate: string,           
  withoutTax: string,        
  withTax:string,           
  detraction: string,        
  netPayable: string,        
  paidAmount: string,        
  totalSalePrice: string,    
  status: string,              
  outstandingAmount: string, 
  supplierOrder: string,     
  advancePayment: string,    
  advanceDate: string,       
  balance: string,          
  balanceDate: string,       
  totalCost: string,         
  supplierInvoice: string,   
  supplierShipment: string,  
  value: string,            
  percentage: string,   
}

export interface SaleExport {
  customerOrderDate: string | null;
  customerOrder: string | null;
  quoteCode: string;
  companyName: string | null;
  line: string | null;
  companyRuc: string | null;
  deliveryTime: string | null;
  deliveryDate: string | null;
  invoiceNumber: string | null;
  currencyType: string;
  paymentType: string | null;
  observation: string | null;
  paymentMethod: string | null;
  period: string;
  startDate: string | null;
  dueDate: string | null;
  withoutTax: number | null;
  withTax: number | null;
  detraction: number | null;
  netPayable: number | null;
  paidAmount: number | null;
  totalSalePrice: number | null;
  status: string | null;
  outstandingAmount: number | null;
  supplierOrder: string | null;
  advancePayment: number | null;
  advanceDate: string | null;
  balance: number | null;
  balanceDate: string | null;
  totalCost: number | null;
  supplierInvoice: string | null;
  supplierShipment: string | null;
  value: number | null;
  percentage: number | null;
}
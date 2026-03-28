export default interface Employee {
  employee_id: number, 
  first_name: string,
  last_name: string
  password: string,
  employee_type: string,
}

export default interface MenuItem {
  name: string  
  cost: number,
  active: boolean,
  seasonal_menu_item: boolean
}

export default interface LoginCreds {
  id: number,
  password: string
}
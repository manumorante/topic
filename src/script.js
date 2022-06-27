// Crea un array con valores aleatorios entre dos cantidades dadas
function create_ramdom_number_array(length, begin, end) {
  let array = []
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * (end - begin + 1) + begin))
  }

  // Ordenar el array de menor a mayor
  array.sort((a, b) => a - b)

  return array
}

// Suma los valores del array hasta llegar a `container_capacity`
function sum_values (values, container_capacity) {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
    // Elimina cada valor ya sumado del array original
    values.splice(i, 1)

    // Si la suma es igual a la capacidad del contenedor, termina con éxito
    if (sum === container_capacity) {
      console.log('Se ha alcanzado la capacidad exacta', sum)
      return sum
    }

    // Si la suma es mayor a la capacidad del contenedor, sigue probando con otros valores
    if (sum > container_capacity) {
      const diff_up = sum - container_capacity
      console.log('Se ha excedido la capacidad en', diff_up)
      
      // Resta el último valor sumado y devuelvelo a su array original
      console.log('Restando el último valor sumado', values[i])
      
      // Elimina el último valor sumado
      sum -= values[i]

      // Agrega el último valor sumado al array original      
      values.splice(i, 0, values[i])

      // Cuanto falta para llegar a la capacidad?
      const diff_down = container_capacity - sum
      console.log('Falta', diff_down, 'para alcanzar la capacidad')

      // Existe un valor igual a `diff_down` en el array?
      if (values.includes(diff_down)) {
        console.log('Se ha encontrado un valor igual a', diff_down)

        // Si existe, se elimina el valor del array
        values.splice(values.indexOf(diff_down), 1)
        console.log('Se ha eliminado el valor', diff_down)

        // Se suma el valor restante
        sum = sum + diff_down
        console.log('Se ha sumado el valor restante', sum)
        console.log('Éxito! Se comopletado el contenido sin resto.')
      }

      return sum
    }
  }
  return sum
}

const total_containers = 2 // container
const container_capacity = 30 // centimetros
const values = create_ramdom_number_array(50, 1, 20)
const sum = sum_values(values, container_capacity)

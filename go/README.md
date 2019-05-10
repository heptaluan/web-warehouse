```go
// 定义了包名，必须在源文件中非注释的第一行指明这个文件属于哪个包
// package main 表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包
package main

// 告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数
import "fmt"

// main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数，需要注意，{ 不能单独放在一行
func main() {
  // 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头
  // 那么使用这种形式的标识符的对象就可以被外部包的代码所使用（需要先导入这个包），这被称为导出
  // 标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的
  fmt.Println("Hello, World!")
}
```


## 标识符

`_` 本身就是一个特殊的标识符，被称为空白标识符，它可以像其他标识符那样用于变量的声明或赋值（任何类型都可以赋值给它），但任何赋给这个标识符的值都将被抛弃

因此这些值不能在后续的代码中使用，也不可以使用这个标识符作为变量对其它变量进行赋值或运算

在编码过程中，你可能会遇到没有名称的变量、类型或方法，虽然这不是必须的，但有时候这样做可以极大地增强代码的灵活性，这些变量被统称为匿名变量


## 包的概念、导入与可见性

`package main` 表示一个可独立执行的程序，每个 `Go` 应用程序都包含一个名为 `main` 的包

另外要注意的是，所有的包名都应该使用小写字母


#### 标准库

在 `Go` 的安装文件里包含了一些可以直接使用的包，即标准库，其中包含了大量的包（如：`fmt` 和 `os`）

如果对一个包进行更改或重新编译，所有引用了这个包的客户端程序都必须全部重新编译

每一段代码只会被编译一次

如果包名不是以 `.` 或 `/` 开头，如 `"fmt"` 或者 `"container/list"`，则 `Go` 会在全局文件进行查找

如果包名以 `./` 开头，则 `Go` 会在相对目录中查找；如果包名以 `/` 开头（在 `Windows` 下也可以这样使用），则会在系统的绝对路径中查找

导入包即等同于包含了这个包的所有的代码对象



#### 可见性规则

当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，如 `Group1`，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（客户端程序需要先导入这个包），这被称为导出

对包名进行重新设置，`import fm "fmt"`

如果你导入了一个包却没有使用它，则会在构建程序时引发错误（没有不必要的代码）



## 函数

`main` 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数（如果有 `init()` 函数则会先执行该函数）

如果你的 `main` 包的源代码没有包含 `main` 函数，则会引发构建错误

在程序开始执行并完成初始化后，第一个调用（程序的入口点）的函数是 `main.main()`，该函数一旦返回就表示程序已成功执行并立即退出

左大括号 `{` 必须与方法的声明放在同一行，右大括号 `}` 需要被放在紧接着函数体的下一行，如果你的函数非常简短，你也可以将它们放在同一行

程序正常退出的代码为 `0` 即 `Program exited with code 0`，如果程序因为异常而被终止，则会返回非零值（比如 `1` 可以用来测试是否成功执行一个程序）



## 语言变量

如果没有初始化，则变量默认为零值

* 数值类型（包括 `complex64/128`）为 `0`

* 布尔类型为 `false`

* 字符串为 `""`（空字符串）

* 以下几种类型为 [nil](https://www.jianshu.com/p/dd80f6be7969)：

  * `var a *int`

  * `var a []int`

  * `var a map[string] int`

  * `var a chan int`

  * `var a func(string) int`

  * `var a error`（`error` 是接口）

```go
package main

var x, y int

// 因式分解关键字的写法一般用于声明全局变量
var (
  a int
  b bool
)

var c, d int = 1, 2
var e, f = 123, "hello"

func main() {
  g, h := 123, "world"
  println(x, y, a, b, c, d, e, f, g, h)
}

// 0 0 0 false 1 2 123 hello 123 world
```


## 值类型和引用类型

所有像 `int`、`float`、`bool` 和 `string` 这些基本类型都属于值类型，使用这些类型的变量直接指向存在内存中的值（值类型的变量的值存储在栈中）

当使用等号 `=` 将一个变量的值赋值给另一个变量时，如 `j = i`，实际上是在内存中将 `i` 的值进行了拷贝

如果是引用类型的值，当两个变量赋值时，只有引用（地址）被赋值

如果其中一个的值改变了，那么这个值的所有引用都会指向被修改后的内容


#### 使用 := 赋值操作符

这是使用变量的首选形式，但是它只能被用在函数体内，而不可以用于全局变量的声明与赋值

如果在相同的代码块中，我们不可以再次对于相同名称的变量使用初始化声明

如果你在定义变量之前使用它，会得到编译错误，如果你声明了一个局部变量却没有在相同的代码块中使用它，同样会得到编译错误（但是需要注意的是，全局变量是允许声明但不使用的）

如果你想要交换两个变量的值，则可以简单地使用 `a, b = b, a`，前提是两个变量的类型必须是相同

空白标识符 `_` 也被用于抛弃值，如值 `5` 在 `_, b = 5, 7` 中被抛弃

`_` 实际上是一个只写变量，你不能得到它的值，这样做是因为 `Go` 语言中你必须使用所有被声明的变量，但有时你并不需要使用从一个函数得到的所有返回值，如下

```go
package main

import "fmt"

func main() {
  // 只获取函数返回值的后两个
  _, nums, strs := numbers()
  fmt.Println(nums, strs)  // 2 str
}

func numbers() (int, int, string) {
  a, b, c := 1, 2, "str"
  return a, b, c
}

```



## 语言常量

常量是一个简单值的标识符，在程序运行时，不会被修改的量，使用 `const` 来进行定义

常量中的数据类型只可以是布尔型、数字型（整数型、浮点型和复数）和字符串型

常量可以用 `len()`，`cap()`，`unsafe.Sizeof()` 函数计算表达式的值

常量表达式中，函数必须是内置函数，否则编译不过

```go
package main

import "unsafe"

const (
  a = "abc"
  b = len(a)
  c = unsafe.Sizeof(a)
)

func main() {
  // 字符串类型在 go 里是个结构，包含指向底层数组的指针和长度，这两部分每部分都是 8 个字节
  // 所以字符串类型大小为 16 个字节
  println(a, b, c) // abc 3 16
}
```

在定义常量数组的时候，如果不提供初始值，则表示将使用上行的表达式

```go
package main

import "fmt"

const (
  a = 1
  b
  c
  d
)

func main() {
  fmt.Println(a)  // 1

  // b c d 没有进行初始化，所以将会使用 a 的值
  fmt.Println(b)  // 1
  fmt.Println(c)  // 1
  fmt.Println(d)  // 1
}
```





## iota

`iota`，特殊常量，可以认为是一个可以被编译器修改的常量

`iota` 在 `const` 关键字出现时将被重置为 `0`（`const` 内部的第一行之前），`const` 中每新增一行常量声明将使 `iota` 计数一次（`iota` 可理解为 `const` 语句块中的行索引）

第一个 `iota` 等于 `0`，每当 `iota` 在新的一行被使用时，它的值都会自动加 `1`

```go
package main

import "fmt"

func main() {
  const (
    a = iota // 0
    b        // 1
    c        // 2
    d = "ha" // ha（独立的值，但是 iota += 1）
    e        // ha（没有定义，使用上一行的值，但是 iota += 1）
    f = 100  // 100（iota += 1）
    g        // 100（iota += 1）
    h = iota // 7，恢复 iota 计数
    i        // 8
  )

  fmt.Println(a, b, c, d, e, f, g, h, i)
}
```


## 运算符

同其他语言类似，算术运算符有 `+`， `-`， `*`， `/`， `%`， `++`， `--`

关系运算符有 `==`， `!=`， `>`， `<`， `>=`， `<=`

逻辑运算符有 `&&`， `||`， `!`

#### 关于其他运算符

|运算符|  描述|  实例|
|-|-|-|
|`&`|  返回变量存储地址|  `&a;` 将给出变量的实际地址|
|`*`|  指针变量|  `*a;` 是一个指针变量|

两者区别的为，指针变量保存的是一个地址值，会分配独立的内存来存储一个整型数字

当变量前面有 `*` 标识时，才等同于 `&` 的用法，否则会直接输出一个整型数字

```go
package main

func main() {
  var a int = 4
  var ptr *int
  ptr = &a

  println("a 的值为", a)       // 4
  println("*ptr 的值为", *ptr) // 4
  println("ptr 的值为", ptr)   // 0xc00002bf78
}
```

#### 优先级

|优先级（由上至下由高到低）|运算符|
|-|-|
|7|  `^ !`|
|6|  `* / % << >> & &^`|
|5|  `+ - | ^`|
|4|  `== != < <= >= >`|
|3|  `<-`|
|2|  `&&`|
|1|  `||`|

你可以通过使用括号来临时提升某个表达式的整体运算优先级



## 条件语句

#### if

语法为

```go
if 布尔表达式 {
  /* 在布尔表达式为 true 时执行 */
}
```

```go
package main

func main() {
  var a int = 10

  if a < 20 {
    println("a 小于 20")
  }

  println("a 的值为", a)
}

// a 小于 20
// a 的值为 10
```

#### if ... else

```go
if 布尔表达式 {
  /* 在布尔表达式为 true 时执行 */
} else {
  /* 在布尔表达式为 false 时执行 */
}
```

```go
package main

func main() {
  var a int = 50

  if a < 20 {
    println("a 小于 20")
  } else {
    println("a 的值为", a)
  }
}

// a 的值为 50
```


#### switch

有一点区别，默认情况下 `case` 最后自带 `break` 语句，匹配成功后就不会执行其他 `case`

如果我们需要执行后面的 `case`，可以使用 `fallthrough`

```go
switch var1 {
  case val1:
    ...
  case val2:
    ...
  default:
    ...
}
```

```go
package main

func main() {
  var a int = 50

  switch a {
  case 40:
    println("a 的值为40")

  case 50:
    println("a 的值为50")
  }
}

// a 的值为 50
```


#### Type Switch

`switch` 语句还可以被用于 `type-switch` 来判断某个 `interface` 变量中实际存储的变量类型

语法为

```go
switch x.(type){
case type:
  statement(s)

case type:
  statement(s)

default:
  statement(s)
}
```

```go
package main

import "fmt"

func main() {
  var x interface{}

  switch i := x.(type) {
  case nil:
    fmt.Printf(" x 的类型 :%T", i)
  case int:
    fmt.Printf("x 是 int 型")
  case float64:
    fmt.Printf("x 是 float64 型")
  case func(int) float64:
    fmt.Printf("x 是 func(int) 型")
  case bool, string:
    fmt.Printf("x 是 bool 或 string 型")
  default:
    fmt.Printf("未知型")
  }
}

// x 的类型 :<nil>
```



#### fallthrough

使用 `fallthrough` 会强制执行后面的 `case` 语句，`fallthrough` 不会判断下一条 `case` 的表达式结果是否为 `true`

```go
package main

import "fmt"

func main() {

  switch {
  case false:
    fmt.Println("1、case 条件语句为 false")
    fallthrough
  case true:
    fmt.Println("2、case 条件语句为 true")
    fallthrough
  case false:
    fmt.Println("3、case 条件语句为 false")
    fallthrough
  case true:
    fmt.Println("4、case 条件语句为 true")
  case false:
    fmt.Println("5、case 条件语句为 false")
    fallthrough
  default:
    fmt.Println("6、默认 case")
  }
}

// 2、case 条件语句为 true
// 3、case 条件语句为 false
// 4、case 条件语句为 true
```

从以上代码输出的结果可以看出：`switch` 从第一个判断表达式为 `true` 的 `case` 开始执行

如果 `case` 带有 `fallthrough`，程序会继续执行下一条 `case`，且它不会去判断下一个 `case` 的表达式是否为 `true`


#### 补充

* 没有三目运算符，所以不支持 `? :` 形式的条件判断

* 还可以支持多条件匹配

```go
switch {
  case 1, 2, 3, 4:
    
  default:
}
```

* 不同的 `case` 之间不使用 `break` 分隔，默认只会执行一个 `case`

* 如果想要执行多个 `case`，需要使用 `fallthrough` 关键字，也可用 `break` 终止

```go
switch{
  case 1:

    ...

    if(...){
      break
    }

  // 此时 switch(1) 会执行 case1 和 case2，但是如果满足 if 条件，则只执行 case1
  fallthrough 

  case 2:
    ...

  case 3:
}
```




## 循环语句

#### for 循环

有三种方式

```go
// 方式一
for init; condition; post { }

// 方式二
for condition { }

// 方式三
for { }
```

* `init`： 一般为赋值表达式，给控制变量赋初值

* `condition`： 关系表达式或逻辑表达式，循环控制条件

* `post`： 一般为赋值表达式，给控制变量增量或减量

执行过程如下：

* 先对表达式 `1` 赋初值

* 判别赋值表达式 `init` 是否满足给定条件，若其值为真，满足循环条件，则执行循环体内语句

  * 然后执行 `post`，进入第二次循环，再判别 `condition`
  
  * 否则判断 `condition` 的值为假，不满足条件，就终止 `for` 循环，执行循环体外语句

`for` 循环的 `range` 格式可以对 `slice`、`map`、数组、字符串等进行迭代循环

```go
for key, value := range oldMap {
  newMap[key] = value
}
```

```go
package main

import "fmt"

func main() {

  for a := 0; a < 10; a++ {
    println("a 的值为", a)  // 0 到 9
  }

  var b int = 15
  var a int
  for a < b {
    a++
    println("a 的值为", a)  // 1 到 15
  }

  numbers := [6]int{1, 2, 3}
  for i, x := range numbers {
    fmt.Printf("第 %d 位 x 的值 = %d\n", i, x)
    // 第 0 位 x 的值 = 1
    // 第 1 位 x 的值 = 2
    // 第 2 位 x 的值 = 3
    // 第 3 位 x 的值 = 0
    // 第 4 位 x 的值 = 0
    // 第 5 位 x 的值 = 0
    // Range 内容后期在深入了解
  }

}
```

还可以嵌套使用，比如输出 `9 x 9` 乘法表

```go
package main

import "fmt"

func main() {
  for m := 1; m < 10; m++ {
    for n := 1; n <= m; n++ {
      fmt.Printf("%d x %d = %d\n", m, n, m*n)
    }
  }
}
```

输出 `1 - 100` 之间的素数

```go
package main

import "fmt"

func main() {
  var a, b int
  for a = 2; a <= 100; a++ {
    for b = 2; b <= (a / b); b++ {
      if a%b == 0 {
        break
      }
    }
    if b > (a / b) {
      fmt.Printf("%d 是素数\n", a)
    }
  }
}
```



#### 循环控制语句

* `break` 经常用于中断当前 `for` 循环或跳出 `switch` 语句

  * 用于循环语句中跳出循环，并开始执行循环之后的语句

  * `break` 在 `switch`（开关语句）中在执行一条 `case` 后跳出语句的作用

* `continue` 跳过当前循环的剩余语句，然后继续进行下一轮循环

  * 类似于 `break` 语句，但是 `continue` 不是跳出循环，而是跳过当前循环执行下一次循环语句
  
* `goto` 将控制转移到被标记的语句

  * `goto` 语句可以无条件地转移到过程中指定的行

  * `goto` 语句通常与条件语句配合使用，可用来实现条件转移， 构成循环，跳出循环体等功能

  * 一般不主张使用 `goto` 语句， 以免造成程序流程的混乱，使理解和调试程序都产生困难

如果循环中条件语句永远不为 `false` 则会进行无限循环，例如

```go
for true {
  fmt.Printf("这是无限循环");
}
```





## 函数

定义如下

```go
func function_name( [parameter list] ) [return_types] {
  函数体
}
```

比如下面这个 `max()` 函数

```go
package main

import "fmt"

func main() {
  var a int = 100
  var b int = 200
  var ret int

  ret = max(a, b)

  fmt.Printf("最大值为 %d", ret)
}

func max(num1, num2 int) int {
  var result int

  if num1 > num2 {
    result = num1
  } else {
    result = num2
  }

  return result
}
```



#### 返回多个值

```js
package main

func swap(x, y string) (string, string) {
  return y, x
}

func main() {
  // 如果不需要多个值，可以使用 _ 来进行忽略
  // _, b := swap("world", "hello")
  a, b := swap("world", "hello")
  println(a, b)
}
```



#### 函数参数

函数如果使用参数，该变量可称为函数的形参（形参就像定义在函数体内的局部变量），一般有两种方式来传递参数

* 值传递  值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数

* 引用传递  引用传递是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数

```go
// 值传递，不会影响到实际参数
package main

import "fmt"

func main() {

  /* 定义局部变量 */
  var a int = 100
  var b int = 200

  fmt.Printf("交换前 a 的值为 : %d\n", a)
  fmt.Printf("交换前 b 的值为 : %d\n", b)

  /* 通过调用函数来交换值 */
  swap(a, b)

  fmt.Printf("交换后 a 的值 : %d\n", a)
  fmt.Printf("交换后 b 的值 : %d\n", b)
}

/* 定义相互交换值的函数 */
func swap(x, y int) int {
  var temp int

  temp = x /* 保存 x 的值 */
  x = y    /* 将 y 值赋给 x */
  y = temp /* 将 temp 值赋给 y*/

  return temp
}



// 如果传递指针参数传递到函数内，那么在函数中对参数所进行的修改，将影响到实际参数
package main

import "fmt"

func main() {
  /* 定义局部变量 */
  var a int = 100
  var b int = 200

  fmt.Printf("交换前，a 的值 : %d\n", a)
  fmt.Printf("交换前，b 的值 : %d\n", b)

  /* 调用 swap() 函数
   * &a 指向 a 指针，a 变量的地址
   * &b 指向 b 指针，b 变量的地址
   */
  swap(&a, &b)

  fmt.Printf("交换后，a 的值 : %d\n", a)
  fmt.Printf("交换后，b 的值 : %d\n", b)
}

func swap(x *int, y *int) {
  var temp int
  temp = *x /* 保存 x 地址上的值 */
  *x = *y   /* 将 y 值赋给 x */
  *y = temp /* 将 temp 值赋给 y */
}

// 也可以使用下面这种比较简便的方式
func swap(x *int, y *int){
  *x, *y = *y, *x
}
```


#### 函数用法

函数作为另外一个函数的实参

```go
package main

import (
  "fmt"
  "math"
)

func main() {
  getSquare := func(x float64) float64 {
    return math.Sqrt(x)
  }

  fmt.Println(getSquare(9)) // 3
}
```

也支持匿名函数，可作为闭包

```go
package main

import "fmt"

func getSequence() func() int {
  i := 0
  return func() int {
    i += 1
    return i
  }
}

func main() {
  // nextNumber 为一个函数，函数 i 为 0
  nextNumber := getSequence()

  // 调用 nextNumber 函数，i 变量自增 1 并返回
  fmt.Println(nextNumber()) // 1
  fmt.Println(nextNumber()) // 2

  // 创建新的函数
  nextNumber1 := getSequence()

  fmt.Println(nextNumber1()) // 1
  fmt.Println(nextNumber1()) // 2
  fmt.Println(nextNumber1()) // 3
}
```

也可以当做方法来进行使用，一个方法就是一个包含了接受者的函数，接受者可以是命名类型或者结构体类型的一个值或者是一个指针

所有给定类型的方法属于该类型的方法集，语法格式如下

```go
func (variable_name variable_data_type) function_name() [return_type]{
  /* 函数体*/
}
```

但是需要注意的是，**没有面向对象**

在其他语言当中，实现类的方法做法都是编译器隐式的给函数加一个 `this` 指针，而在 `Go` 里，这个 `this` 指针需要明确的申明出来

```go
package main

import "fmt"

// 定义结构类
type Circle struct {
  radius float64
}

func main() {
  var c1 Circle
  c1.radius = 10.00
  fmt.Println("圆的面积 = ", c1.getArea())
}

// 该方法属于 Circle 类型对象中的方法
func (c Circle) getArea() float64 {
  // c.radius 即为 Circle 类型对象中的属性
  return 3.14 * c.radius * c.radius
}
```




## 变量作用域

同其他语言类似，也分为局部变量，全局变量和形式参数

需要注意的几个地方

* 全局变量与局部变量名称可以相同，但是函数内的局部变量会被优先考虑

* 不同类型的局部和全局变量默认值为
  
  * `int: 0`
  
  * `float32: 0`
  
  * `pointer: nil`



## 数组

声明方式如下

```go
var variable_name [SIZE] variable_type
```

比如

```go
// 定义了数组 balance 长度为 10 类型为 float32
var balance [10] float32
```

初始化操作

```go
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

几个需要注意的地方

* 初始化数组中 `{}` 中的元素个数**不能**大于 `[]` 中的数字（比如 `[2]float64{1, 2, 3}` 会报错）

* 如果 `{}` 中的元素个数小于 `[]` 中的数字，则会用 `0` 进行填充（`[5]float64{1, 2, 3}` ==> `[1 2 3 0 0]`）

* 如果忽略 `[]` 中的数字不设置数组大小，会根据元素的个数自动来设置数组的大小

* 如果忽略 `[]` 中的数字不设置数组大小，会根据元素的个数自动来设置数组的大小

数组也可以当做参数来进行传递，但是需要注意以下两点

* 未定义长度的数组只能传给不限制数组长度的函数

* 定义了长度的数组只能传给限制了相同数组长度的函数

```go
package main

import "fmt"

func main() {

  /* 未定义长度的数组只能传给不限制数组长度的函数 */
  var array = []int{1, 2, 3, 4, 5}
  setArray(array)

  /* 定义了长度的数组只能传给限制了相同数组长度的函数 */
  var array2 = [5]int{1, 2, 3, 4, 5}
  setArray2(array2)

}

func setArray(params []int) {
  fmt.Println("length: ", len(params))
}

func setArray2(params [5]int) {
  fmt.Println("length: ", len(params))
}
```





## 指针

我们知道，变量是一种使用方便的占位符，用于引用计算机内存地址

`Go` 语言的取地址符是 `&`，放到一个变量前使用就会返回相应变量的内存地址

```go
package main

import "fmt"

func main() {
  var a int = 10

  fmt.Printf("变量 a 的地址为：%x", &a) // c000010098
}
```

#### 什么是指针

一个指针变量指向了一个值的内存地址

类似于变量和常量，在使用指针前你需要声明指针

```go
var var_name *var-type
```

* `*var-type` 为指针类型

* `var_name` 为指针变量名

* `*` 用于指定变量是作为一个指针

比如下例就是一个指向 `int` 和 `float32` 的指针

```go
var ip *int     // 指向整型

var fp *float32 // 指向浮点型
```


#### 如何使用

1. 定义指针变量

2. 为指针变量赋值

3. 访问指针变量中指向地址的值

在指针类型前面加上 `*` 来获取指针所指向的内容

```go
package main

import "fmt"

func main() {
  var a int = 20 /* 声明实际变量 */
  var ip *int    /* 声明指针变量 */

  ip = &a /* 指针变量的存储地址 */

  fmt.Printf("a 变量的地址是: %x\n", &a)

  /* 指针变量的存储地址 */
  fmt.Printf("ip 变量储存的指针地址: %x\n", ip)

  /* 使用指针访问值 */
  fmt.Printf("*ip 变量的值: %d\n", *ip)
}

// a 变量的地址为： c000054080
// ip 变量储存的指针地址为： c000054080
// ip 变量的值为： 20
```


#### 空指针

当一个指针被定义后没有分配到任何变量的时候，它的值为 `nil`，也称为空指针

> 一个指针变量通常缩写为 `ptr`

```go
package main

import "fmt"

func main() {
  var ptr *int

  fmt.Printf("ptr 的值为： %x", ptr)  // 0
}
```

空值的判断可以直接与 `nil` 进行比较

```go
if (ptr != nil)

if (ptr == nil)
```




## 结构体

结构体是由一系列具有相同类型或不同类型的数据构成的数据集合

结构体定义需要使用 `type` 和 `struct` 语句

* `struct` 语句定义一个新的数据类型，结构体有中有一个或多个成员

* `type` 语句设定了结构体的名称

```go
type struct_variable_type struct {
  member definition;
  member definition;
  ...
  member definition;
}
```

一旦定义了结构体类型，它就可以用于变量的声明

```go
variable_name := structure_variable_type {value1, value2...valuen}

// or

variable_name := structure_variable_type { key1: value1, key2: value2..., keyn: valuen}
```

```go
package main

import "fmt"

type Books struct {
  title   string
  author  string
  subject string
  book_id int
}

func main() {

  // 创建一个新的构造体
  // book := Books{"xxx", "xxx", "xxx", 50}

  // 也可以使用 key-value 格式
  // book := Books{
  //   title:   "XXX",
  //   author:  "XXX",
  //   subject: "XXX",
  //   book_id: 50,
  // }

  // 如果不传递，则会置为 0 或者空
  // 这里需要注意，结尾处需要添加一个 ,
  // 或者写成 author: "XXX" }
  book := Books{
    title:  "XXX",
    author: "XXX",
  }

  fmt.Println(book)
}
```

#### 成员访问

成员访问使用 `.` 操作符

```go
package main

import "fmt"

type Books struct {
  title   string
  author  string
  subject string
  book_id int
}

func main() {

  var book Books

  book.title = "xxxx"

  fmt.Println(book.title)  // xxxx
}
```


#### 结构体作为参数传递

结构体本身作为参数是按值来进行传递的

```go
package main

import "fmt"

type Books struct {
  title   string
  author  string
  subject string
  book_id int
}

func changeBook(book Books) {
  book.title = "change book"
}

func main() {
  var book Books
  book.title = "book1"

  fmt.Println(book) // {book1   0}

  changeBook(book)

  fmt.Println(book) // {book1   0}

}
```

如果想在函数内部改变结构体的数据内容，则需要传入指针

```go
package main

import "fmt"

type Books struct {
  title   string
  author  string
  subject string
  book_id int
}

func changeBook(book *Books) {
  book.title = "change book"
}

func main() {
  var book Books
  book.title = "book1"

  fmt.Println(book) // {book1   0}

  changeBook(&book)

  fmt.Println(book) // {change book   0}

}
```




## 切片

切片是对数组的抽象，在 `Go` 语言当中，数组的长度是不可改变的

提供了一种灵活，功能强悍的内置类型切片（动态数组）

与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大

简单来说，实际的是获取数组的某一部分

切片由三部分组成，指向底层数组的指针、`len`、`cap`


#### 定义

可以声明一个未指定大小的数组来定义切片（不需要说明长度）

```go
var identfier []type

// 或者使用 make() 函数来创建切片（len 是数组的长度并且也是切片的初始长度）
var slice1 []type = make([]type, len)

// 也可以简写为
slice1 := make([]type, len)

// 也可以指定容量，其中 capacity 为可选参数
make([]T, length, capacity)
```


#### 初始化

如下

```go
// [] 表示切片类型，{1, 2, 3} 初始化值依次为 1, 2, 3
s := []int {1, 2, 3}

// 初始化切片，是数组 arr 的引用
s := arr[:]

// 提取 arr 中的元素创建为一个新的切片（从下标 startIndex 到 endIndex - 1）
s := arr[startIndex: endIndex]

// 如果缺省 endIndex 表示一直到 arr 的最后一个元素
s := arr[startIndex: ]

// 如果缺省 startIndex 时将表示从 arr 的第一个元素开始
s := s[ :endIndex]

// 也可以通过某个切片来初始化另外一个切片
s1 := s[startIndex: endIndex]

// 通过内置函数 make() 初始化
s := make([]int, len, cap)
```

#### len() 和 cap()

切片是可索引的，并且可以由 `len()` 方法获取长度

切片提供了计算容量的方法 `cap()`，可以测量切片最长可以达到多少

```go
package main

import "fmt"

func main() {
  var numbers = make([]int, 3, 5)
  // len = 3, cap = 5, slice = [0 0 0]
  fmt.Printf("len = %d, cap = %d, slice = %v", len(numbers), cap(numbers), numbers)
}
```


#### 空切片

一个切片在未初始化之前默认为 `nil`，长度为 `0`

```go
package main

import "fmt"

func main() {
  var numbers []int
  // len = 0, cap = 0, slice = []
  fmt.Printf("len = %d, cap = %d, slice = %v", len(numbers), cap(numbers), numbers)
}
```

#### append() 和 copy()

用于向切片追加新元素和拷贝切片

```go
var numbers []int

// 向空切片追加元素
numbers = append(numbers, 0)

// 像切片尾部添加一个元素
numbers = append(numbers, 1)

// 可以同时追加多个元素
numbers = append(numbers, 2, 3, 4)

// 创建一个新的切片，容量是之前的两倍
numbers2 := make([]int, len(numbers), (cap(numbers)) * 2)

// 将 numbers 的内容拷贝到 numbers2
copy(numbers2, numbers)
```

这里有个需要注意的地方

```go
package main

import "fmt"

func main() {
  numbers := []int{1, 2}
  fmt.Printf("cap = %d\n", cap(numbers))  // cap = 2

  numbers = append(numbers, 3, 4, 5)
  fmt.Printf("cap = %d\n", cap(numbers))  // cap = 6
}
```

这里的 `cap` 由 `2` 变为了 `6`，原因是因为（摘自 `stackoverflow`）

`Go` 会为你的 `slice` 提供比你需要的更多的容量，原因是在 `slice` 的底层，有个不可变动的（`immutable`）数组（`array`）在实际起作用

当你要为 `slice` 添加元素从而让切片的容量更大的时候，实际上是创建了一个新数组，把原来的切片元素和新添加的元素放到新的数组里，并把这个数组作为新 `slice` 的底层

如果你添加很多数据到 `slice` 里，就会反复去创建和复制这些数据，影响性能

所以运行时会分配比你期望的更多的容量到 `slice`，让复制数据这些操作变得不那么频繁

需要注意的是，在使用 `copy()` 函数的时候，对于 `copy(dst, src)`，要初始化 `dst` 的 `size`，否则无法复制

```go
// 错误示例
package main

import "fmt"

func main() {
  dst := make([]int, 0)
  src := []int{1, 2, 3}

  copy(dst, src)

  fmt.Printf("slice=%v\n", dst) // []
  fmt.Printf("slice=%v\n", src) // [1, 2, 3]
}
```

可以发现，复制是没有成功的，这里需要初始化 `dst` 的 `size`

```go
package main

import "fmt"

func main() {
  // 设定 size 为 3
  dst := make([]int, 3)
  src := []int{1, 2, 3}

  copy(dst, src)

  fmt.Printf("slice=%v\n", dst)
  fmt.Printf("slice=%v\n", src)
}
```

如果 `size` 小于 `3`，比如 `2`，则结果为 `[1, 2]`

如果 `size` 大于 `3`，比如 `5`，则结果会用 `0` 进行填充，为 `[1 2 3 0 0]`

所以使用之前切片的 `len` 是比较好的做法，`dst := make([]int, len(src))`



#### 合并多个数组

可以利用 `append()` 方法进行多个数组的合并

```go
package main

import "fmt"

func main() {
  var arr1 = []int{1, 2, 3}
  var arr2 = []int{4, 5, 6}
  var arr3 = []int{7, 8, 9}
  var s1 = append(append(arr1, arr2...), arr3...)
  fmt.Printf("s1 的值为：%v", s1)
}
```


#### 补充

有一个需要注意的地方

```go
package main

import "fmt"

func main() {
  numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8}
  numbers2 := numbers[2:5]
  fmt.Printf("len = %d, cap = %d, slice = %v", len(numbers2), cap(numbers2), numbers2)
}
```

上面的结果为

```go
len = 3, cap = 7, slice = [2 3 4]
```

`cap` 之所以为 `7`，是因为 `numbers2` 的指针变量（`ptr`）指向 `numbers` 的第三个元素

后面还剩余 `3, 4, 5, 6, 7, 8`，所以 `cap` 的值为 `7`，如果调整为

```go
package main

import "fmt"

func main() {
  numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8}
  numbers2 := numbers[5:]
  fmt.Printf("len = %d, cap = %d, slice = %v", len(numbers2), cap(numbers2), numbers2)
}
```

那么结果为

```go
len = 4, cap = 4, slice = [5 6 7 8]
```

因为 `numbers2` 的 `ptr` 指向第六个元素，后面还剩余 `5, 6, 7, 8`，所以 `cap` 的值为 `4`





## Range

`range` 关键字用于 `for` 循环中迭代数组（`array`），切片（`slice`），通道（`channel`）或集合（`map`）的元素

在数组和切片中它返回元素的索引和索引对应的值，在集合中返回 `key-value` 对的 `key` 值

```go
package main

import "fmt"

func main() {
  
  // 使用 range 去求一个 slice 的和（数组类似）
  // 在使用 range 的时候，将传入 index 和 value 两个变量
  // 因为不需要使用 index 变量，所以使用 _ 进行忽略
  nums := []int{1, 2, 3, 4, 5}
  sum := 0
  for _, num := range nums {
    sum += num
  }
  fmt.Println("sum ", sum)


  // 获取 index 的值
  for i, num := range nums {
    if num == 3 {
      fmt.Println("index ", i)
    }
  }


  // range 也可以使用在 map 的键值对上
  kvs := map[string]string{"a": "apple", "b": "banana"}
  for k, v := range kvs {
    fmt.Printf("%s => %s\n", k, v)
  }


  // range 也可以用来枚举 Unicode 字符串
  // 第一个参数是字符的索引，第二个是字符（Unicode的值）本身
  for i, c := range "go" {
    fmt.Println(i, c)
  }

}
```





## Map

`Map` 是一种无序的键值对的集合，`Map` 最重要的一点是通过 `key` 来快速检索数据，`key` 类似于索引，指向数据的值

`Map` 是一种集合，所以我们可以像迭代数组和切片那样迭代它，不过 `Map` 是无序的，我们无法决定它的返回顺序，这是因为 `Map` 是使用 `hash` 表来实现的


#### 定义

可以使用内建函数 `make` 也可以使用 `map` 关键字来定义 `Map`

```go
/* 声明变量，默认 map 是 nil */
var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
map_variable := make(map[key_data_type]value_data_type)
```

如果不进行初始化操作，则会创建一个 `nil map`，`nil map` 不能用来存放键值对

```go
package main

import "fmt"

func main() {
  /* 创建集合 */
  // var countryCapitalMap map[string]string
  var countryCapitalMap = make(map[string]string)

  /* map插入key - value对,各个国家对应的首都 */
  countryCapitalMap["France"] = "Paris"
  countryCapitalMap["Italy"] = "罗马"
  countryCapitalMap["Japan"] = "东京"
  countryCapitalMap["India "] = "新德里"

  /* 使用键输出地图值 */
  for country := range countryCapitalMap {
    fmt.Println(country, "首都是", countryCapitalMap[country])
  }

  /* 查看元素在集合中是否存在 */
  capital, ok := countryCapitalMap["美国"] /*如果确定是真实的,则存在,否则不存在 */
  if ok {
    fmt.Println("美国的首都是", capital)
  } else {
    fmt.Println("美国的首都不存在")
  }
}
```




#### delete() 函数

`delete()` 函数用于删除集合的元素, 参数为 `map` 和其对应的 `key`

```go
package main

import "fmt"

func main() {
  /* 创建 Map */
  countryCapitalMap := map[string]string{
    "France": "Paris",
    "Japan":  "Tokyo",
  }

  /* 删除元素*/
  delete(countryCapitalMap, "France")

  for country := range countryCapitalMap {
    fmt.Println(country, "首都是", countryCapitalMap[country])
  }
}
```





## 接口

`Go` 语言提供了另外一种数据类型接口，它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口

```go
/* 定义接口 */
type interface_name interface {
  method_name1 [return_type]
  method_name2 [return_type]
  method_name3 [return_type]
  ...
  method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
  /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
  /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
  /* 方法实现*/
}
```

```go
package main

import (
  "fmt"
)

// 定义一个接口Phone
type Phone interface {
  // 有一个方法 call()
  call()
}

type NokiaPhone struct {
}

func (nokiaPhone NokiaPhone) call() {
  fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {
}

func (iPhone IPhone) call() {
  fmt.Println("I am iPhone, I can call you!")
}

func main() {
  // 定义了一个 Phone 类型变量，并分别为之赋值为 NokiaPhone 和 IPhone
  // 然后调用 call() 方法
  var phone Phone

  phone = new(NokiaPhone)
  phone.call()

  phone = new(IPhone)
  phone.call()

}
```

简单来说就是

```go
func (name string) fn() string {
  print("这是实现方法的写法")
}

func sum(x int, y int) int {
  print("这是正常定义函数的写法")
}
```

在来看看接口方法传参

```go
package main

import "fmt"

type Phone interface {
  call(param int) string
  takephoto()
}

type Huawei struct {
}

func (huawei Huawei) call(param int) string {
  fmt.Println("i am Huawei, i can call you!", param)
  // 注意，这里需要 return
  return "damon"
}

func (huawei Huawei) takephoto() {
  fmt.Println("i can take a photo for you")
}

func main() {
  var phone Phone
  phone = new(Huawei)
  phone.takephoto()

  r := phone.call(50)
  fmt.Println(r)
}
```




## 错误处理

通过内置的错误接口提供了非常简单的错误处理机制，`error` 类型是一个接口类型

```go
type error interface {
  Error() string
}
```

我们可以在编码中通过实现 `error` 接口类型来生成错误信息，使用 `errors.New` 即可

```go
import "errors"

func Sqrt(f float64) (float64, error) {
  if f < 0 {
    return 0, errors.New("math: square root of negative number")
  }
}
```




## 并发

`Go` 语言支持并发，我们只需要通过 `go` 关键字来开启 `goroutine` 即可

`goroutine` 是轻量级线程，`goroutine` 的调度是由 `Golang` 运行时进行管理的

允许使用 `go` 语句开启一个新的运行期线程， 即 `goroutine`，以一个不同的、新创建的 `goroutine` 来执行一个函数

同一个程序中的所有 `goroutine` 共享同一个地址空间

```go
package main

import (
  "fmt"
  "time"
)

func say(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(100 * time.Millisecond)
    fmt.Println(s)
  }
}

func main() {
  go say("world")
  say("hello")
}
```

执行后可以发现，两者的输出是没有固定的先后顺序的，因为它们是两个 `goroutine` 在执行


#### 通道（channel）

是用来传递数据的一个数据结构

通道可用于两个 `goroutine` 之间通过传递一个指定类型的值来同步运行和通讯

操作符 `<-` 用于指定通道的方向，发送或接收，如果未指定方向，则为双向通道

```go
ch <- v    // 把 v 发送到通道 ch
v := <-ch  // 从 ch 接收数据
           // 并把值赋给 v
```

声明一个通道很简单，使用 `chan` 关键字即可，通道在使用前必须先创建

```go
ch := make(chan int)
```

需要注意的是，默认情况下，通道是不带缓冲区的，发送端发送数据，同时必须又接收端相应的接收数据

以下实例通过两个 `goroutine` 来计算数字之和，在 `goroutine` 完成计算后，它会计算两个结果的和

```go
package main

import "fmt"

func sum(s []int, c chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  c <- sum // 把 sum 发送到通道 c
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}

  c := make(chan int)
  go sum(s[:len(s)/2], c)
  go sum(s[len(s)/2:], c)
  x, y := <-c, <-c // 从通道 c 中接收

  fmt.Println(x, y, x+y) // -5 17 12
}
```



#### 通道缓冲区

通道可以设置缓冲区，通过 make 的第二个参数指定缓冲区大小

```go
ch := make(chan int, 100)
```

带缓冲区的通道允许发送端的数据发送和接收端的数据获取处于异步状态

就是说发送端发送的数据可以放在缓冲区里面，可以等待接收端去获取数据，而不是立刻需要接收端去获取数据

不过由于缓冲区的大小是有限的，所以还是必须有接收端来接收数据的，否则缓冲区一满，数据发送端就无法再发送数据了

需要注意的是，如果通道不带缓冲，发送方会阻塞直到接收方从通道中接收了值

* 如果通道带缓冲，发送方则会阻塞直到发送的值被拷贝到缓冲区内

* 如果缓冲区已满，则意味着需要等待直到某个接收方获取到一个值

接收方在有值可以接收之前会一直阻塞

```go
package main

import "fmt"

func main() {
  // 这里我们定义了一个可以存储整数类型的带缓冲通道
  // 缓冲区大小为 2
  ch := make(chan int, 2)

  // 因为 ch 是带缓冲的通道，我们可以同时发送两个数据
  // 而不用立刻需要去同步读取数据
  ch <- 1
  ch <- 2

  // 获取这两个数据
  fmt.Println(<-ch)
  fmt.Println(<-ch)
}
```



#### 遍历通道与关闭通道

通过 `range` 关键字来实现遍历读取到的数据，类似于与数组或切片

```go
v, ok := <-ch
```

如果通道接收不到数据后 `ok` 就为 `false`，这时通道就可以使用 `close()` 函数来关闭

> 关闭通道并不会丢失里面的数据，只是让读取通道数据的时候不会读完之后一直阻塞等待新数据写入

```go
package main

import (
  "fmt"
)

func fibonacci(n int, c chan int) {
  x, y := 0, 1
  for i := 0; i < n; i++ {
    c <- x
    x, y = y, x+y
  }
  close(c)
}

func main() {
  c := make(chan int, 10)
  go fibonacci(cap(c), c)
  // range 函数遍历每个从通道接收到的数据，因为 c 在发送完 10 个
  // 数据之后就关闭了通道，所以这里我们 range 函数在接收到 10 个数据
  // 之后就结束了，如果上面的 c 通道不关闭，那么 range 函数就不
  // 会结束，从而在接收第 11 个数据的时候就阻塞了
  for i := range c {
    fmt.Println(i)
  }
}
```


更好的展示边入边出概念

```go
package main

import (
  "fmt"
  "time"
)

func main() {

  c := make(chan int, 10)

  go fibonacci(cap(c), c)

  for v := range c {
    fmt.Println("out:", time.Now())
    fmt.Println(v)
  }
}

func fibonacci(n int, c chan int) {
  x, y := 0, 1

  for i := 0; i < n; i++ {
    c <- x
    fmt.Println("in:", time.Now())
    time.Sleep(100)
    x, y = y, x+y
  }

  close(c)
}
```


#### 补充

如果我们单独写一个 `say2` 函数来跑之前的示例，并且 `Sleep` 时间设置长一点，`150` 毫秒，看看会发生什么

```go
package main

import (
  "fmt"
  "time"
)

func say(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(100 * time.Millisecond)
    fmt.Println(s, (i+1)*100)
  }
}

func say2(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(150 * time.Millisecond)
    fmt.Println(s, (i+1)*150)
  }
}

func main() {
  go say2("world")
  say("hello")
}
```

问题来了，`say2` 只执行了 `3` 次，而不是设想的 `5` 次，为什么呢？

原来，在 `goroutine` 还没来得及跑完 `5` 次的时候，主函数已经退出了

我们要想办法阻止主函数的结束，要等待 `goroutine` 执行完成之后，再退出主函数

```go
package main

import (
  "fmt"
  "time"
)

func say(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(100 * time.Millisecond)
    fmt.Println(s, (i+1)*100)
  }
}

func say2(s string, ch chan int) {
  for i := 0; i < 5; i++ {
    time.Sleep(150 * time.Millisecond)
    fmt.Println(s, (i+1)*150)
  }
  ch <- 0
  close(ch)
}

func main() {
  ch := make(chan int)
  go say2("world", ch)
  say("hello")
  fmt.Println(<-ch)
}
```

我们引入一个通道，默认的通道的存消息和取消息都是阻塞的

在 `goroutine` 中执行完成后给通道一个值 `0`，则主函数会一直等待通道中的值

一旦通道有值，主函数才会结束
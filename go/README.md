```go
// 定义了包名，必须在源文件中非注释的第一行指明这个文件属于哪个包
// package main 表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包
package main

// 告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数
import "fmt"

// main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数，需要注意，{ 不能单独放在一行
func main() {
	// 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（需要先导入这个包），这被称为导出
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

  * `goto` 语句通常与条件语句配合使用。可用来实现条件转移， 构成循环，跳出循环体等功能。

  * 一般不主张使用 `goto` 语句， 以免造成程序流程的混乱，使理解和调试程序都产生困难

如果循环中条件语句永远不为 `false` 则会进行无限循环，例如

```go
for true {
  fmt.Printf("这是无限循环。\n");
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
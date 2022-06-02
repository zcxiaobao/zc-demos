## `DSL` 语言

`DSL` 即领域专用语言（domain specific language / DSL），其基本思想是**求专不求全**，是专门针对某一特定问题的计算机语言。与通用语言相比，在一些特定领域，其执行效率更高，更易于使用。

下面来举一个例子: 求解某 `CSV` 文件中不同银行账户余额总和。第一列为账户所有人姓名，第二列为账户金额。

```
name, balance
Lisa, 100.30
Bert, 241.41
Maria, 151.13
```

可以使用通用语言(例如 `Ruby`)来求解金额总和，具体见下面代码。

```ruby
#!/usr/bin/env ruby

exit(1) if ARGV.empty? || !File.exist?(ARGV[0])

sum = 0
File.foreach(ARGV[0]).each_with_index do |line, idx|
next if idx == 0
sum += Float(line.split(',')[1])
end
puts sum.round(2)

```

下面使用 `DSL` 语言 `AWK` 来解决上面问题

```
#!/usr/bin/awk -f

BEGIN{FS=","}{sum+=$2}END{print sum}
```

可以发现，`AWK` 程序代码非常短，相较 `Ruby` 缩短了四倍。此外，由于 `DSL` 更专注于解决特定领域的问题，`AWK` 更详尽的处理了 `CSV` 中的异常情况。通过上述案例，我们可以明显感觉到 `DSL` 领域在某些特定领域的强大之处。

## 设计 `DSL` 语言的挑战

原型设计、`DSL` 设计以及 `DSL` 的演化都具备一定的难度。根据过往经验，你需要不断地将想法设计成原型，将其整合到 `DSL` 语言中，然后做具体的测试，根据测试反馈不断改进 `DSL`。

`DSL` 的设计，有两个组件非常重要: 语言词法分析器/解析器和语言处理器。词法分析器/解析器使根据语言制定的语义来接受输入的组件。解析/词法分析阶段会生成一个语法树，然后将其传递给语言处理器。语言处理器来对语法树进行评估。上文提到的案例中，运行 `Ruby` 和 `AWK` 解释器，脚本和 `CSV` 文件作为输入，两个解释程序对其进行评估，求解出账户余额综合。

解释器生成器等工具通过生成代码的方式来减少词法分析器/解析器开发的工作量，复杂的 `DSL` 框架还提供在 `IDE` 中自定义语言支持的功能。

设计 `DSL` 语言的另一方式是借助标准数据交换格式（例如`.toml`，`.yaml`或  `.json`作为一种配置方式）。与解析器生成器类似，这种方法也可以减少解析器的工作量，但如果涉及到实际语言处理器的实现时，这种方法无法实现。此外大多数标准数据交换格式本质上仅限于一些简单的格式(如列表、字典、字符串和数字)来表示数据。这种限制下，配置文件会特别大。例如下面案例: 开发一个使用乘法 `*`、加法 `+` 对整数进行运算的计算器。

如果使用类似 `YAML` 配置来描述语言，即使是简单的数学术语，配置文件也会非常复杂。例如 `1 + 2 * 3 + 5` 语言。

```
term:
add: - 1 - times: - 2 - 3 - 5
```

本篇文章的重点在于微语言的设计，核心思想是提供一个简单的、可扩展的语言核心，无需解析器或者语言处理器，便可以便捷的使用自定义类型和自定义函数进行扩展。`DSL` 设计者通过接口实现的方式将它们挂接在语言核心中，以实现 `DSL` 中的核心概念。

## `Lingo`：Go 的微型语言框架

在 `Gitlab` 中，我们经常使用 `Go` 开发一些自用的、小型的、可嵌入的 `DSL`，来简化用户的配置和交互。

最初的方案是尝试集成现有的、可嵌入的和可扩展的语言，唯一的条件是能嵌入原生 `Go` 应用程序中。例如 `go-lua` —— 利用 `Go` 是实现的 `Lua VM`；`go-yeagi` —— 提供一个 `Go` 解释器；`go-zygomys` —— 使用 `Go` 编写的 `LISP` 解释器。但这些包都是基于通用语言的集成，在其之上构建 `DSL` 会是模块变得复杂，而我们希望设计、实现、嵌入和发展 `DSL` 成为一个灵活、小型、简易、适应性好的 `Go` 应用程序。

可以将上述要求凝练为下面几条:

- 稳定性： `DSL` 的更改既不需要实现核心词法分析器/解析器，也不需要对语言处理器实现进行任何更改。
- 灵活性/可组合性：可以通过简单的插件机制集成新的 `DSL` 概念（数据类型、函数）。
- 简单性：语言框架应具备强大的可扩展性，以保证 `DSL` 的迭代和发展。微语言框架应该基于纯 `Go` 语言实现，这样可以保证其简单的与 `Go` 应用程序集成。

`FOSS` 工具都无法满足上述需求，因此基于 `Go` 我们开发了新的微语言框架 `Lingo`，是一门 `Go` 中基于 `LISP` 的 `DSL` 语言。

`Lingo` 为构建基于符号表达式（S-表达式）的 `DSL` 提供了基础，即嵌套列表形式表达式 (f...)，f 是函数符号的占位符。使用这种格式，可以将上面提到的数学术语写成 `S-expression (+ 1 (* 2 3) 5)`。

`S` 表达式统一了表达式格式，用途广泛且易于处理，同时还可以使用一致的格式来表示代码和数据。

`Lingo` 提供了一种简单的插件机制来添加新功能和类型，无需更改核心解析器或语言处理器。从 S 表达式解析器方面来分析，实际的函数符号与 S 表达式本质上是无关的，语言处理器只是评估 S 表达式，然后将其分配给接口进行实现。具体的实现由插件提供。

`Lingo` 代码库大约由 `3k` 行 `Go` 代码组成，包括词法解析器/分析器、代码转换引擎和解释器/评估器。

## 使用 `Lingo` 设计数据生成引擎

下面的案例中，利用 `Go` 基于 `Lingo` 设计一个数据生成引擎。该数据生成引擎可用于模糊测试或其他应用上下文的结构化输入数据。此案例将详细讲解如何利用 `Lingo` 创建语言及其对应的语言处理器。

案例文件依旧使用最初的 `CSV` 文件:

```

name, balance
Lisa, 100.30
Bert, 241.41
Maria, 151.13

```

我们的语言包含下列功能:

- `(oneof s0, s1, ..., sN)`: 随机返回任一字符串参数 sX (0 <= X <= N)
- `(join e0, e1, ..., eN)`: 连接所有的参数表达式，值为 eX
- `(`genfloat` min max)`: 生成最值之间的任一数值
- `(times num exp)`: 重复 num 次 exp 数据模式

该案例中，利用 `Lingo` 构建语言和语言处理器来自动生成 `CSV` 输出，然后将对应输出传入 `Ruby` 和 `AWK` 程序中，进行相应压力测试。同时我们将该语言命名为随机文本生成器 `(RTG).rtg`。

下面是一个示例脚本 `script.rtg`，测试是否可以随机生成 `CSV` 文件，程序中首先利用连接功能生成 `CSV` 的标题名称，然后随机生成 10 行名称和金额，同时还随机生成了部分空行。

```go

(join
(join "name" "," "balance" "\n")
(times 10
'(join
(oneof
"Jim"
"Max"
"Simone"
"Carl"
"Paul"
"Karl"
"Ines"
"Jane"
"Geralt"
"Dandelion"
"Triss"
"Yennefer"
"Ciri")
","
(`genfloat` 0 10000)
"\n"
(oneof "" "\n"))))

```

下面是 `script.rtg` 脚本的生成结果。

```

name,balance
Carl,25.648205
Ines,11758.551

Ciri,13300.558
...

```

接下来我们来探究 `RTG` 剩余的两大核心部分:

- 浮点数据类型和结果集
- 实现 `times，oneof，`genfloat` 和 join` 函数

### 引入浮点数据类型和结果集

`Lingo` 中区分数据类型和结果集，数据类型规定数据的使用方式，结果集则用于在函数间传递结果，每个结果的类型都是唯一的。下面的代码片段中，引入 `float` 数据类型:

```go

// introduce float type
var TypeFloatId, TypeFloat = types.NewTypeWithProperties("float", types.Primitive)
// introduce token float type for parser
var TokFloat = parser.HookToken(parser.TokLabel(TypeFloat.Name))

// recognize (true) as boolean
type FloatMatcher struct{}

// this function is used by the parser to "recognize" floats as such
func (i FloatMatcher) Match(s string) parser.TokLabel {
if !strings.Contains(s, ".") {
return parser.TokUnknown
}

if \_, err := strconv.ParseFloat(s, 32); err == nil {
return TokFloat.Label
}

return parser.TokUnknown
}
func (i FloatMatcher) Id() string {
return string(TokFloat.Label)
}

func init() {
// hook matcher into the parser
parser.HookMatcher(FloatMatcher{})
}

```

此外，我们来需要一个传递浮点值的结果集。我们用接口来实现它，函数的名称代表了函数的作用，最重要的是 Type 函数，它返回了自定义浮点类型 `float`。

```go

type FloatResult struct{ Val float32 }
// deep copy
func (r FloatResult) DeepCopy() eval.Result { return NewFloatResult(r.Val) }
// returns the string representation of this result type
func (r FloatResult) String() string {
return strconv.FormatFloat(float64(r.Val), 'f', -1, 32)
}
// returns the data type for this result type
func (r FloatResult) Type() types.Type { return custtypes.TypeFloat }
// call-back that is cleaned up when the environment is cleaned up
func (r FloatResult) Tidy() {}

func (r FloatResult) Value() interface{} { return r.Val }
func (r *FloatResult) SetValue(value interface{}) error {
boolVal, ok := value.(float32)
if !ok {
return fmt.Errorf("invalid type for Bool")
}
r.Val = boolVal
return nil
}
func NewFloatResult(value float32) *FloatResult {
return &FloatResult{
value,
}
}

```

### 实现 `DSL` 函数

`DSL` 函数的实现与数据类型和结果集类型，都需要接口来实现。下面我们来举个 `genfloat` 函数的例子。`genfloat` 函数中有三个很重要的函数，分别是 `Symbol()`、`Validate()` 和 `Evaluate()` 函数。`Symbol()` 函数返回值为处于 `genfloat` 特殊情况下的函数符号。

其中还有两个重要的概念: 环境和堆栈。环境通常用来存储中间结果，通常在环境中定义/声明变量。堆栈用来存储函数的输入参数，例如 (genfloat 0 10000)，堆栈中将存储两个 `IntResult` 参数(IntResult 是 `Lingo` 提供的标准结果集)，分别是 0 和 10000。

`Validate()` 和 `Evaluate()` 函数接收环境 `env` 和堆栈 `stack` 作为参数。`Validate()` 确保参数可以被函数使用，而 `Evaluate()` 实际上调用函数。在这种情况下，我们在指定范围内生成一个浮点值并返回对应的 `FloatResult`。

```go
type FunctionGenfloat struct{}

// returns a description of this function
func (f *FunctionGenfloat) Desc() (string, string) {
  return fmt.Sprintf("%s%s %s%s",
    string(parser.TokLeftPar),
    f.Symbol(),
	"min max",
	string(parser.TokRightPar)),
	"generate float in rang [min max]"
}

// this is the symbol f of the function (f ...)
func (f *FunctionGenfloat) Symbol() parser.TokLabel {
  return parser.TokLabel("genfloat")
}

// validates the parameters of this function which are passed in
func (f *FunctionGenfloat) Validate(env *eval.Environment, stack *eval.StackFrame) error {
  if stack.Size() != 2 {
    return eval.WrongNumberOfArgs(f.Symbol(), stack.Size(), 2)
  }

  for idx, item := range stack.Items() {
    if item.Type() != types.TypeInt {
	  return eval.WrongTypeOfArg(f.Symbol(), idx+1, item)
	}
  }
  return nil
}

// evaluates the function and returns the result
func (f *FunctionGenfloat) Evaluate(env *eval.Environment, stack *eval.StackFrame) (eval.Result, error) {
  var result float32
  rand.Seed(time.Now().UnixNano())
  for !stack.Empty() {
    max := stack.Pop().(*eval.IntResult)
    min := stack.Pop().(*eval.IntResult)

	minval := float32(min.Val)
	maxval := float32(max.Val)

	result = minval + (rand.Float32() * (maxval - minval))
  }

  return custresults.NewFloatResult(result), nil
}

func NewFunctionGenfloat() (eval.Function, error) {
  fun := &FunctionGenfloat{}
  parser.HookToken(fun.Symbol())
  return fun, nil
}
```

### 整合

所有功能实现完成后，我们把他们注册/集成在 （eval.HookFunction(...)），以便 `Lingo` 的解析。下面的代码段中，将注册实现的 `times`、`oneof`、`join`、`genfloat` 自定义函数，并使用 `main` 函数测试 `script.rtg` 脚本中的代码。

```go

// register function
func register(fn eval.Function, err error) {
if err != nil {
log.Fatalf("failed to create %s function %s:", fn.`Symbol()`, err.Error())
}
err = eval.HookFunction(fn)
if err != nil {
log.Fatalf("failed to hook bool function %s:", err.Error())
}
}

func main() {
// register custom functions
register(functions.NewFunctionTimes())
register(functions.NewFunctionOneof())
register(functions.NewFunctionJoin())
register(functions.NewFunction`genfloat`())
register(functions.NewFunctionFloat())
if len(os.Args) <= 1 {
fmt.Println("No script provided")
os.Exit(1)
}
// evaluate script
result, err := eval.RunScriptPath(os.Args[1])
if err != nil {
fmt.Println(err.Error())
os.Exit(1)
}

// print output
fmt.Printf(strings.ReplaceAll(result.String(), "\n", "\n"))

os.Exit(0)
}

```

文章到这里，通过大约 300 行 Go 代码，成功设计一门语言并实现其语言处理器。下面我们使用 RTG 来测试 `Ruby` 脚本和 `AWK` 脚本的稳健性。

```go

timeout 10 watch -e './rtg script.rtg > out.`CSV` && ./computebalance.`AWK` out.`CSV`'
timeout 10 watch -e './rtg script.rtg > out.`CSV` && ./computebalance.rb out.`CSV`'

```

上面的案例证明，RTG 可以处理所有生成的 `CSV` 文件，其输出结果满足 `AWK` 脚本的要求。而 `Ruby` 脚本由于无法正确处理 `CSV` 文件的换行符，执行会抛出异常。

如果想了解更多，请参考: https://about.gitlab.com/blog/2022/05/26/a-go-micro-language-framework-for-building-`DSL`s/

```

```

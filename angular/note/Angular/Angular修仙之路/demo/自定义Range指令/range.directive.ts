import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[range]'
})
export class RangeDirective {

  // 定义一个局部变量 _range
  _range: number[];

  // 定义输入属性
  @Input()
  set range(value: number) {
    this.vcr.clear();
    this._range = this.renderRange(value[0], value[1]);
    this._range.forEach( num => {
      // 设置了第二个参数 {$implicit: num}
      // 因为 Angular 为我们提供了 let 模板语法，允许在生成上下文时定义和传递上下文
      // 这将允许我们引用 *range="[20,30]; let num" 模板中声明的变量
      // 使用 $implicit 名称，因为我们不知道用户在使用这个指令时，会使用什么名字
      this.vcr.createEmbeddedView(this.tpl, { $implicit: num });
    });
  }

  // 导入依赖
  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {}

  // 渲染函数
  private renderRange(from: number, to: number): number[] {
    const numbers: number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

}

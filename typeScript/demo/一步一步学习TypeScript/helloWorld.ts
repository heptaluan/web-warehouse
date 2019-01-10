class Hello {
  public static main(): number {
    console.log(`hello world`)
    return 0;
  }

  hello() {
    console.log(`hello`)
  }
}

Hello.main();

new Hello().hello();
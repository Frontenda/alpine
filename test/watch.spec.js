import Alpine from 'alpinejs'
import { wait } from '@testing-library/dom'

global.MutationObserver = class {
    observe() {}
}

test('$watch', async () => {
    document.body.innerHTML = `
        <div x-data="{ foo: 'bar', bob: 'lob' }" x-init="$watch('foo', value => { bob = value })">
            <h1 x-text="foo"></h1>
            <h2 x-text="bob"></h2>

            <button x-on:click="foo = 'baz'"></button>
        </div>
    `

    Alpine.start()

    expect(document.querySelector('h1').innerText).toEqual('bar')
    expect(document.querySelector('h2').innerText).toEqual('lob')

    document.querySelector('button').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual('baz')
        expect(document.querySelector('h2').innerText).toEqual('baz')
    })
})

test('$watch nested properties', async () => {
    document.body.innerHTML = `
        <div x-data="{ foo: { bar: 'baz', bob: 'lob' } }" x-init="
            $watch('foo.bar', value => { foo.bob = value });
        ">
            <h1 x-text="foo.bar"></h1>
            <h2 x-text="foo.bob"></h2>

            <button x-on:click="foo.bar = 'law'"></button>
        </div>
    `

    Alpine.start()

    expect(document.querySelector('h1').innerText).toEqual('baz')
    expect(document.querySelector('h2').innerText).toEqual('lob')

    document.querySelector('button').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual('law')
        expect(document.querySelector('h2').innerText).toEqual('law')
    })
})

test('$watch arrays', async () => {
    document.body.innerHTML = `
        <div x-data="{ foo: ['one'], bob: 'lob' }" x-init="$watch('foo', value => { bob = value })">
            <h1 x-text="foo"></h1>
            <h2 x-text="bob"></h2>

            <button id="push" x-on:click="foo.push('two')"></button>
            <button id="pop" x-on:click="foo.pop()"></button>
            <button id="unshift" x-on:click="foo.unshift('zero')"></button>
            <button id="shift" x-on:click="foo.shift()"></button>
            <button id="assign" x-on:click="foo = [2,1,3]"></button>
            <button id="sort" x-on:click="foo.sort()"></button>
            <button id="reverse" x-on:click="foo.reverse()"></button>
        </div>
    `

    Alpine.start()

    expect(document.querySelector('h1').innerText).toEqual(['one'])
    expect(document.querySelector('h2').innerText).toEqual('lob')

    document.querySelector('#push').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual(['one','two'])
        expect(document.querySelector('h2').innerText).toEqual(['one','two'])
    })

    document.querySelector('#pop').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual(['one'])
        expect(document.querySelector('h2').innerText).toEqual(['one'])
    })

    document.querySelector('#unshift').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual(['zero','one'])
        expect(document.querySelector('h2').innerText).toEqual(['zero','one'])
    })

    document.querySelector('#shift').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual(['one'])
        expect(document.querySelector('h2').innerText).toEqual(['one'])
    })

    document.querySelector('#assign').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual([2,1,3])
        expect(document.querySelector('h2').innerText).toEqual([2,1,3])
    })

    document.querySelector('#sort').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual([1,2,3])
        expect(document.querySelector('h2').innerText).toEqual([1,2,3])
    })

    document.querySelector('#reverse').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual([3,2,1])
        expect(document.querySelector('h2').innerText).toEqual([3,2,1])
    })
})

test('$watch nested arrays', async () => {
    document.body.innerHTML = `
        <div x-data="{ foo: {baz: ['one']}, bob: 'lob' }" x-init="$watch('foo.baz', value => { bob = value })">
            <h1 x-text="foo.baz"></h1>
            <h2 x-text="bob"></h2>

            <button id="push" x-on:click="foo.baz.push('two')"></button>
        </div>
    `

    Alpine.start()

    expect(document.querySelector('h1').innerText).toEqual(['one'])
    expect(document.querySelector('h2').innerText).toEqual('lob')

    document.querySelector('#push').click()

    await wait(() => {
        expect(document.querySelector('h1').innerText).toEqual(['one','two'])
        expect(document.querySelector('h2').innerText).toEqual(['one','two'])
    })
})

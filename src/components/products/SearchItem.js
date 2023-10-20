import React from "react"
const SearchItem = () => {
    <div id="root">
        <section class="align-element py-20">
            <form method="get" action="/products" class="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
                <div class="form-control">
                    <label for="search" class="label"><span class="label-text capitalize">search product</span>
                    </label>
                    <input type="search" name="search" class="input input-bordered input-sm" value="" />
                </div>
                <div class="form-control">
                    <label for="category" class="label"><span class="label-text capitalize">select category</span>
                    </label>
                    <select name="category" id="category" class="select select-bordered select-sm" fdprocessedid="wwob1q">
                        <option value="all">all</option>
                        <option value="Tables">Tables</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Kids">Kids</option>
                        <option value="Sofas">Sofas</option>
                        <option value="Beds">Beds</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="company" class="label"><span class="label-text capitalize">select company</span>
                    </label>
                    <select name="company" id="company" class="select select-bordered select-sm" fdprocessedid="1ki842">
                        <option value="all">all</option>
                        <option value="Modenza">Modenza</option>
                        <option value="Luxora">Luxora</option>
                        <option value="Artifex">Artifex</option>
                        <option value="Comfora">Comfora</option>
                        <option value="Homestead">Homestead</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="order" class="label"><span class="label-text capitalize">sort by</span>
                    </label>
                    <select name="order" id="order" class="select select-bordered select-sm" fdprocessedid="gt40cg">
                        <option value="a-z">a-z</option>
                        <option value="z-a">z-a</option>
                        <option value="high">high</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="price" class="label cursor-pointer"><span class="label-text capitalize">select price</span><span>$1,000.00</span>
                    </label>
                    <input type="range" name="price" min="0" max="100000" class="range range-primary range-sm" step="1000" value="100000" />
                    <div class="w-full flex justify-between text-xs px-2 mt-2"><span class="font-bold text-md">0</span><span class="font-bold text-md">Max : $1,000.00</span>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-sm" fdprocessedid="741bg">search</button> 
            </form>
            <div class="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
                <div class="flex gap-x-2">
                    <button type="button" class="text-xl btn btn-circle btn-sm btn-primary text-primary-content" fdprocessedid="oxbz7">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                        </svg>
                    </button>
                    <button type="button" class="text-xl btn btn-circle btn-sm btn-ghost text-based-content" fdprocessedid="fyqqw">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    </div>
}

export default SearchItem;

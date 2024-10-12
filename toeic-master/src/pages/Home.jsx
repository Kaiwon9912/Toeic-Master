
import NavItem from "../components/NavItem";
function Home()
{
    return (
        <>
            <div className="m-auto mt-5 max-w-7xl">
             
             
                <ul className="flex justify-around h-48 space-x-5 overflow-auto md:overflow-visible md:h-auto">
             
                    <li><NavItem 
                    title="Luyện nghe"
                    img="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMWFRUVFRcYFxcVGB0YFxcVFxcXFxcXFxUYHSggGBolHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0lHyUtLS0tLS0tLS0vLS0tLS0uLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAL8BCAMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQQFAgYHAwj/xABHEAACAgECAwUFAwoDBAsBAAABAgADEQQSBSExBhNBUWEiMnGBkQcUoSMzQlJicoKxwdEVovAkNEOSJVNjc4OTo7KzwuEW/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwUEBv/EADARAQACAQMCAwYEBwAAAAAAAAABAhEDBDESIVFxwQUyQWGBsRMiI6EzcpHR4fDx/9oADAMBAAIRAxEAPwDzmIET1tRERARAiAiIgIiICIiAiIEBEZiAiAYgDERARAMQEREBERmAiMxAREQEREBLJmWAiIgIkiBYjMkCxJECxJECyRAgWJIzAsc4kgWJIgWJIgWJMRASxNvwPgZuV7rXFGmqIFlzDPtHmK60HOyw/qjoOZ8AQ1EGbftFwuuk02UM76fUVCyprAocEEpZW+3luVhzxy9odes08CxJECxJAgWJI+UCxJLAkREBGYiABlkiAzLJEBAiICMxEBERACIgQAMAxEBERARLLXWWIVRlmIAA6kk4AHqT/OB9NJprLXWupS7scKqgk5PLw8OfM+E9I/wam9m0wS+6nQ3V6VatMVVu9sz941tuQeW8Mo8Bt8ATMa/hOvpH3HhtNo24Go1KDujfcR7SrexXFSE7QFPUHPr5+uodWYh2VjkOQ5BPP2gzA8+fXPWY8nDs3abTLXoqKg+8VazX11t+tWr1gty82GeXnOqTs2r238MqavKtoHKWpnIZNU5ZblOMgl12lfh8+sywGYiWUSBEQAMCIgJZJYRIliFSJYgSJZ9tLpLLW21VvY2M7a1ZzjzwoJx/eB8In31eksqbbbW9bYztsVkbHnhgDjl19J8YG+4Pw9DpbL+5S50d8i17VVa66lfKrSylmOX6nGEmKeN+C6bSJ/4AsP8A65ebHsqQaNSrOFXPMscACzSa6jqf27KvoJ13TUtZyrVnPkgLfykHfODdn6NXZebAENmn0ZrFa7Qll9GWdUXCj8pUcjGMFx4iefrz9DPTOybtSyG78if8PDHvj3WDTqb6VLGzAUYuTGfMTz/jFGzUX1j9C61fkrsv9JInussMRI7Y5zsHZHsVq+IndWBXQDhrnB28uoRethHpgeZEszhIjLrzWDznzXUgnA5nyB5/Se76XsHwjh9Ys1Zrc/r6tl2k+S1HCH4YJ9Ys+1ThVA2UixgOWKadi8vLfsGJh1+EMul4Tbdt5MCv73L+YlW4T3On7YOHPysW9B+3UGH0RmP4T7Dg3A+KA9yKDYRkmj8jcP2mQAE/xKRHXPxg6YeFA56GJ3Xth9l2p0ga7TE6ikczgflkHmyDk49V/wCUDnOj1W5mcWiUmMOc5VuQQykggggjIII5gg+BzJEqN/wntRYurp1Ore7UCti2xrCcNtIVlDeyCpIYDGOU7S/bDRhX1Cul2pWs9x940SjUC0nbufUUYqdApbkQD5HwnWeCmkaYAp31tmrqL1ou61dJp1NjlM+7uJIJzjCnPIS9rlV1q1bbhdrH1F5UkYSjvNtAx5kBueegmMxEyrP1luj+46u3T2LW2q+7KdIT7dNld622bB1aghcq2OWSOXQdMlgSxCJEuIlCSWIEliIEliIR99Dobbm2U1vY2MkIpYgeZAHIes56nhd9fOyi2v8A7yt1/wDconZeJaRw33drtGtCMM6ajU9xu/VL26hAbHxg733egAm34TokrRrdJdqrjWGUqL3Omru7my2sNZUtffqWrVDjaubBzbImMyuHm4IPQyzK4pxK3UWtdc+93xlsAdOQAAAAGJhsceXzmQ2nAV0ve7tWz90iltlY9q1h7tW79AHxY/hnIxvvrLYz0lqNxOBXY2VUnOzfncw5Dr1xM3tDxGm01Lp6u6qpqVBuC947dXssZfeJYnx5emSJqZBk/fGaxbLc3bSuRazHcoOdhbO4Dr0PjMntA2la0PpN6I6gmuzn3Vh96tXz7ajwJ5zWzbdm+LJp3fvqhbTbU9dicg2GHssjkZVg2Ofx9IHLs1xr7q7khitiBTsYK4KurgqzKw/RKnlnDnBBnZrftNfoun5eVlveD6GsH8Z0IgjrnwPPyPQyRNYky33Eu1eottW5SKGVCg7ncvss24j2mPUgdMe6JpLrSzM7sWZiSzMckknJJJ6k9czhODqSQqgszEBVHUsTgAepJA+ccHLd9jOy1vEtR3akpUmDbZ+oh8B5u2Dj4EnpO/8AaP7VadPX904bXuNWK1tYDuQqjGa1By55YBIC+PMddb2z1I4Vw+rhVDAX3r3mrsHXDcmGfDcRtH7FZ88zrHCOwmpuUO22lT0D53keewdPmQfSabXrHe0t1NO1pxWHX9frbtQ5uuse1/F3OSB5D9UegwBMady1P2eapOdVlb48MlD+II+pnXeI8Ntp/wB4oev9rHs/83NT8jLTVpf3ZL6V6e9DCFJIyOfnjqPlOKsVYMCVZTkEEhgfMEcwfUTmFXwf6gj+WZyNjDlvBz65HzyJsa3pHY77XLKV7vXK96j3bU296PRwxAcftZzy/Szy132k9mFXHE9Gws0mobcSv/Csc+Q6KzZHPmGyD1E6S4yObp/r4Cd3+y3tAiWtw7UEWaXWZTDe6lrAgYz0D8lP7Ww+cxmMd4V0tGyMyzO7RcFbRau3SsSdjeyx/TrI3I3Trg4OPEEeEwZnE5YS2vAuJrpxqDhjZbp3prIxhDYVDscnOdgYDHiZrGYnGSTgYGTnA8hnoOs4xKLiSJtuF6bTfd9RbfZ+UVVWipGw7WMebtkfm1HXz59DjIcuM8EGmrq33I19g3NSntd1WRlC9oON5/VHTOc+fFuNg1d1900Y9jb3gqYXZxjfv343+OcYz4TUASyDb6DgRu09t1VitZT7VlBGLO5GM2qTycA9QOY+YB1M4kTb8e0OnQUvpru8S2oMyOym2q0cnSwKBgZ5qcc+fhzNGRwLgtFtTXajU9wotFY9ndklC/8ATE2R7NaAKrtxAqjkBWNR2tyO/aejbWG04mNwLhLarRtUjorDVK/t78YFD/qIxHzwM8us7DouE6lKK6K30+QhrLWnUNWVua28ZoakV7l3kFnDbTgYUzCZ+aw6zxXgemShrtPqu+KNUrLtxjvBYeufDuz8Yn213BG0uiu32I3e2aUqFFgIAGoPPvK158xkdR445RMoGJqdfpG2WPXbfaaqkdWfuqg1VS1ZyubLCdgPIp73Uzlou1llQAq0+mQBgwULaRuGMMd9pLHkOZJmhiMI4qMcpuuz/Fm0hsuFJLWU2VVWsSFrZuTOoK4dgOWMjGT5zW6LR2XOKqkZ3bO1VGWOAScD4AzO4vxl7q9PSUWuvTVlFRc4LE5exs/pscZ+HrEjB0Oke1xXWu5iDgZAACgsxLNgKoAJJJwACZmf4FduCgVkFGsFgtrNPdodrubt2wBTgHJyCQOpGczsdpGayxwj2V11N3tVaG17a7cVNWiKQQSHPtZG3GfDB7HTw89wP9k1YpVGqfSnTWm6yywpb3y25xt30od2Bt7tV2ndkyZHUBwK7cykVqqormxraxTsc4RhcW2EMQQMHJIPkcYWt0j1O1di4YYyMg8iAQQRkMpBBBBIIIInfLtB+RydJq2oZEqTSjTWrdU9Jdxa1uSNub7Duwd/esNq7OXW+2GlZbUco9aWVL3VdlZqequvNK1ujknKise1k7s58cBEj5ca4pZq0qsakk6alKrbxlt67iKjacYRuZGSfaJ+Q002PB+M2acXKoVkvqNViPkqQejciMMvPBzyyZ8OIcPtosNV6GtwASrY6MMg5HIgg+H9JYGLmds+yjhg1HFKtwytCtcfLK4VP87q38M6nPY/sd7MbNPZrDYQ2pR6wu382qWOm7JPtElc+HLExvOIWvLrnBdN/iGv1HEbfarFzCgdQQns1tjyVAp/eJPhO8T56fgqaNE0tZytSqAcYJ5ZLEDxJJJ+M+eu73b+R7vdn/ibtuOfgvMnpONr3m+pOfJ3dvSKacY82RIR4HoZptLp9d3itbfRsB9pK6mBYeQZmOJupqtGPi21nPwafWdl9Hbkvp68nqUGwn5oQZgf/wAFof8Aq3/8x/7zswM13EV1ZP5BqFXA52K7Nnx5KQJnXUvxFsfVhfS0+ZrE/Rj6Psnoq/d06EjxfNhz5+2Tia/tX2QrvQvQoqvXmrJhAxHg2PHybqDjwm54TTqV3HUW12ZxtCV7AvXPMk5zy+k2SjJx5x+JetsxbKfhUtXE1w6P9qQ+8abh3Eiu17ENNwxzFgBbYfLay3j5zz6fortT2SXVaL7r3m0o/eo+3OHG481z47mGfWfnVfUY9D4TtaU5ju4d4iJ7GYgSzYwB1649T4evLwm07StpO+26IHuUrRd7bt1rhfbtKvzTJ5bQAPZzjnLwLV6etdQ11fe2GnZQrKGrFjHBsfPQqACPPJ9Jqlxy3e74/Dx/CQbers1ebKEYBO/AIZj7KAobD3hx7LCod5t67WU+MX8O071WW6W+yzuQpsW2sVlq2cV97VtdsruZBtbBG4Gd74kzji2kJOKx9/KknaAwbV7juwcfkhpueDhdvIzpy27m4mxIYHTk5DiwHOs0vMWBVDD12jPkJIlWr4pwq3T7O9Xb3ikj0KsUdDkcnVhhl8OXmJk8Ar0r9+mqbuyaWNFuWwly8wGRQdwYcuhxjlzM3/bL/ctL3n53Ne7d7277nR3mc887fu+fX1nSs/6Msd4RxwD1H1k2DyE3PaW7SvatmkU1o9SF6iDiq0DDqrN7y8gc+pmplHFVHpE5RA3HDuz92pRrKO6sYMd1KMBcF67xU2Mp4eyT06TE4Pwq3Uv3dCb2C7jzACoCAWZmIAUZHPPjMEiCB5QNymrt0Nl1dNtLM9fdNbSd4CtgsKrSAQfAkeXoDNNAiBQ3ly+E5d4fM/UzhEDn3h8z9TOJbPU/WSICbZdXZrGopvvrRak7tLLvZVE5kK9iqWI8ATyHpzmpgwOy8H4PZp+I6Wq9FBNtbDDK6uhb2WVlJBU4OPhP0PpPcHz/AJmflzhmrNFtdyAbq3VwD0JU55/H+s/Q/YftCur0aXtsrYtYGQNnaVsYDOefNQrfxTVqRK15Y/H/AM83wX+Qmu3CbDjjA3Ngg8l6fATVPSSZxNX35830OhH6dc+ENN2Y4fq6muOquFgdgaxknHNsnmBtBBX2RyGJv4kMlrdU5laVisYhE6TT9q9DqbqQult7t94JO4rlcHlvUEjng+uJuFE5RW3TOVvWLRMPjpchFV2DOFUMem5gOZx4ZPOZFXvD4j+cx+5559ZkVnmPiP5yZ7rMREdneDPCPtdqzrq9qksdMpIAyTh7efLmeQPwA+nt+o1taqzmxAFUkksMAAZyTmfnTi3a/UX6lNWp+72JWqL3bHkAWY5J97JY5GMYxync04fOWaAET716Zine7HNQYKzqp2gn9HeQVDY8/pPrxbib6h+8tCb9oBKIte45J3MEABc5648B5T7cV49qNQFW60sie4gCpWvwrQBc+uMzcxfTtJxZNRYvdVCmmtFrqQYLBVHV36u5OTk+nxOpMRA3C9pdQHocsD3GMAjKvhe7zYM+0xrxWW5EqoHhmZnHNVTVUlemo7r73RVbYxta0hO8cimvIG1N1SsTzJwBnlz6/p7mRldDhlIZTgEAg5BwwIPzE2PEu0eqvTu7rQ6DHLu61xg5GCiAgemcc5MGXx4rxa3UbO9bOxSB6lmLO7ZPN2Y5J8cDwAmDIYlG34DxGisXV6ikWV3V7dyhe9qcc0ep26c+o6Hl1xg6tqmCqzKQrZCsVIViPeCseRx44nCbTQ9oNRVW1KWZpcEGqxVsr555hbAdh55yuOcg1ef9eplmdwji9umYvQQrkY3FEZl55yhcHafDI84juMCWQGJQiJYEiBEBECWBIjMQGJxZAeoB+U5QIHqXYPjAu04rY/lKQFPqn6DfTkfVfWdmnifCeI2ae1ba+o6jwZT1VvQ/2nrnBOMV6msWVn95T7yHyI/r4zkbvQmluqOJdjZ7iL16Z5hsJMyz5vUCc+PmDg/hPG90OZMs+a0gHPMnzJzj4eU+kE4Jqe0/FxpqGflvPs1g+LnoceQ6n4TN4hr66ENlrBVH1J8AB4n0nknaHjb6q3vGGFHJE/VX18yfE/2nq22hOpbM8Q8m63EadcRzP+5anux1wCfPxz6nznKInZcQiJYEiIzAREQEYlkzACIiAlklgIkiBYklgJIgwLJEQLEkQAliSAmToNbZS4sqYqw8R5eRB5EehmPJ446nw8ZJjMYkicd4ejcC7crYy131lXYhQyc1LEgDK9V5n1ncA4855TwDs5rLLa3XTWlEsrZmKlQFVwSctjIwCeXlPUBQZx93SlZjo+Lt7LUtqVnrnh9iw851ntD2yr07tUiNZYuM59lFJAYZPU8iOQHznZUqAnnHbLs9qzqbb109rVOV2ui7gcVqDyXJHMHqPCTa0pe89fGF3mpbTpE08XX+K8Vu1D77myR0A5Ko8lXw+PUzCldSDgggjwI5j5GcZ2YiIjEOJMzM5lYkiVFkiICUSRAREQEsksBJEQLERAmYzEQGYzEuIEzGYiAzGYiAiIgMxmJ3j7Nuzguc6m0ZrrbCKejWDnuPmFyPmfSadxr10NOdS3wZUpN5xDj2W7AvcBbqSaqzzVB+cceZz7g/E+nWejcL4Lp9OMU1KnrjLH4ufaP1mwknyG532tuJ/NPbwjj/AC6WnpVpwydDqNjc/dIwf7z4argjZzVhlPTmMj68jOM5pYR0JHwOJlt93+HXovGY/eGz81Z6qy4afglhPt4QeJJBPyAmXrbVwqJ7qDA9Z8LLWbqxPxM+cuvvIvWaUjETznknqtObSxeIcNpvXbdWtg/aGSPgeo+U6B2l+zsqDZoyWx1pY5b+Bz1+B5+vhPSZZq2+81dCc0nt4fBhfSrfmH50PI4IwQcEHqCOR69DJmek/ab2bBU6yoYYYFwA94HAFnxBwD6HPhz82n1+13Ndxpxev1+UubqUmlsSZjMSz0MEjMshgMy5kiAjMokgMxmWSABlkiAjEsQJEsQJEskBLGIgSBGJYEM977P8OGn01VI/QQbvVzzc/NiZ4r2d03eaqhPA3Jn90MCR9AZ73Pn/AG5qe5p/X+3q9m0rzKSyTIt/NoPMsfxA/pODWuYmfCM/vEer2TLHiJZipJEQETIo9ywein6H/wDZjzK1cRE+Mesx6JEvnqaFsRq3GVdSrDzVhgj6Gfn7V6Zq7HqY+1W7IfUqSpP4T9Czxf7QdPs193k+xx/Ei5/zBp2vYepjUtTxjP8AT/ry7uvaJdcxEsT6R4UiXEQIIlxEBJLGIEiXEQJiWIgTEsgiBTJECBcRJECxIIEAZTIIzA7B2BrzxCj0Ln6VOR+OJ7XPG/s3H/SFX7tn/wAbT2WfL+25/Xj+WPvLobX3J80mRquiD9gH6kmY8yNd72PJVH+UTmV7adp8o+8+jfPMMeIlmpkkSyQPvpP0h5o34c/6T4TI0HvgeeR9VMx5tt/DrPzmPtPqxjmSeTfarXjWqfOhPqHsH8sT1meW/a0P9opP/Y//AHae/wBjzjcx5S07mP03RpZBE+sc4gxEAZcSRAsSCBARECAMskQj/9k="/> 
                    </li>
                    <li>
                        <a href="#/reading">
                        <NavItem 
                    title="Luyện đọc"
                    img="https://www.21kschool.com/ru/wp-content/uploads/sites/7/2022/12/8-tips-to-help-students-build-better-reading-skills.png"/> 
                        </a>
                    </li>
                    <li><NavItem 
                    title="Luyện viết"
                    img="https://www.readingrockets.org/sites/default/files/styles/card_image_mobile_1x/public/2023-05/persuasive-writing.jpg?itok=m4JuXMYa"/> 
                    </li>
                    <li>
                        <a href="#/speaking">
                            <NavItem 
                        title="Luyện nói"
                        img="https://aten.edu.vn/wp-content/uploads/2022/11/hinh-anh-bai-mau-ielts-speaking-part-2-so-1.webp"/> 
                        </a>
                    </li>
                    
            
                </ul>
                <ul className="flex justify-around space-x-5 text-center md:mt-20">
                    <a href="#/vocabulary" className="w-1/2 p-2 text-lg text-white rounded-full bg-blue3">
                        Từ vựng
                    </a>
                    <a href="#/lessons" className="w-1/2 p-2 text-lg text-white rounded-full bg-blue3">
                    Bài học
                    </a>
                </ul>
             
                
            </div>
        </>
    )
} export default Home;
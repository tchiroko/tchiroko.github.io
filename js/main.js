class Main
{
	getCookie (cname)
	{
		let name = cname + '='
		let decodedCookie = decodeURIComponent(document.cookie)
		let ca = decodedCookie.split(';')

		for(let inter = 0; inter < ca.length; inter++)
		{
			let car = ca[inter]

			while (car.charAt(0) === ' ')
			{
				car = car.substring(1)
			}
			if (car.indexOf(name) === 0)
			{
				return car.substring(name.length, car.length)
			}
		}
		return ''
	}
	setCookie (cname, cvalue)
	{
		document.cookie = `${cname}=${cvalue};path=/`
	}
	disclaimer ()
	{
		let etat = this.getCookie('disclaimer')
		let total = window.location.href.split('disclaimer').length

		console.warn(etat)
		console.warn(total)
		if(etat==='' && total===1)
		{
			let url =`${document.location.origin}/disclaimer`

			document.location.replace(url)
		}
		else if(etat!=='' && total===2)
		{
			let href = $('#AcceptDisclaimer').attr('href')

			document.location.replace(href)
		}
	}
	clickAcceptDisclaimer (event)
	{
		event.preventDefault()
		this.setCookie('disclaimer',1)
		let href = $(event.currentTarget).attr('href')

		document.location.replace(href)
	}
	constructor ()
	{
		this.disclaimer()
		$('#AcceptDisclaimer').on('click',this.clickAcceptDisclaimer.bind(this))
	}
}

window.Main = new Main()

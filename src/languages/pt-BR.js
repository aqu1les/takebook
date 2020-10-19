export default {
	translation: {
		global: {
			welcome: 'Bem vindo ao Takebook !',
			createBook: 'Cadastrar Livro',
			chats: 'Conversas',
			bookmarks: 'Favoritos',
			myads: 'Meus Anúncios',
		},

		new: 'Novo',
		semiNew: 'Semi Novo',
		used: 'Usado',

		success: 'Sucesso',
		back: 'Voltar',

		routes: {
			home: 'Início',
			myAds: 'Meus Anúncios',
			chats: 'Mensagens',
			bookmarks: 'Meus Favoritos',
			logout: 'Desconectar-se',
		},

		error: {
			noConnection: 'Não foi possível contactar o servidor!',
			invalidEmail: 'Email inválido',
			wrongPassword: 'Senha inválida!',
			somethingWentWrong:
				'Algo de errado aconteceu, tente novamente mais tarde.',
		},

		login: {
			email: 'Digite aqui o seu e-mail',
			password: 'Digite aqui a sua senha',
			remindMe: 'Mantenha-se conectado',
			forgot: 'Esqueceu a senha?',
			login: 'Entre',
			register: 'Cadastre-se',
		},

		signUp: {
			name: 'Nome completo',
			email: 'Digite seu melhor e-mail',
			password: 'Digite sua senha',
			confirmPassword: 'Digite sua senha novamente',
			register: 'Cadastrar',

			success: {
				title: 'Cadastro realizado!',
				content:
					'Sinta-se à vontade para publicar um livro ou adquirir novos!',
				button: 'Começar',
			},
			error: {
				title: 'Ocorreu algum erro :(',
				content: 'Tente novamente mais tarde!',
				button: 'Ok',
			},

			addressFormHeader:
				'Preencha os campos para cadastrarmos o seu endereço',
		},

		advertList: {
			recent: 'Mais Recentes',
			noBooks: 'Nenhum livro foi encontrado!',
			advert: {
				locale: 'Local',
				author: 'Autor',
			},
			onRemoveSuccessText: 'O anúncio foi removido com sucesso!',
		},

		advertDetails: {
			tabs: {
				description: 'Descrição',
				localization: 'Localização',
				contact: 'Contato',
			},
			profile: {
				button: 'Ver Perfil',
				talk: 'Entrar em contato',
			},
		},

		categories: {
			highlights: 'Destaques',
			horror: 'Terror',
			comedy: 'Comédia',
			mistery: 'Mistério',
			adventure: 'Aventura',
		},

		onboardModals: {
			first: {
				header: 'Você está pronto para anunciar o seu livro?',
				content: 'É muito simples, são apenas 2 passos!',
				button: 'Vamos lá',
			},
			second: {
				header: 'Tire fotos!',
				textplanation:
					'Será necessário a foto da capa e contracapa. Utilize suas melhores técnicas como fotógrafo para o seu anúncio ficar mais atraente :D',
			},
		},

		newBook: {
			successFeedbackTitle: 'Sucesso!',
			successFeedbackText: 'O anúncio foi cadastrado com sucesso!',
			successFeedbackButton: 'Voltar',
			pageOne: {
				title: 'Selecione as fotos',
				help1: 'Clique nos campos para as adicionar fotos desejadas',
				help2:
					'* Arraste para esquerda caso queira adicionar mais fotos para o seu anúncio',
				help3: '** Adicione no mínimo 2 imagens (Capa e Pósfacio)!',
			},
			pageTwo: {
				help1: 'Me fale sobre seu livro...',
				remember: 'Lembre-se',
				help2:
					'Um livro bem descrito é mais facilmente encontrado numa pesquisa.',
				title: 'Qual o título do livro?',
				author: 'E o autor?',
				bookStatus: 'Defina a condição do livro',
				howMuch: 'Quanto quer por ele?',
			},
			pageThree: {
				categories: 'Em quais categorias ele se encaixa?',
				description:
					'Descreva bem o seu livro, quanto mais detalhes melhor!',
				button: 'Publicar',
			},
		},

		chats: {
			type: 'Digite uma mensagem',
			noChats_1: 'Você não possui nenhuma conversa no momento!',
			noChats_2:
				'Entre em contato com algum anunciante para negociar a compra de um livro!',
			loadChats: 'Carregar conversas',
			firstMessage: 'Olá :) Tenho interesse no seu livro!',
		},

		forgotPassword: {
			step_1: {
				title: 'Recuperar a senha',
				helpText:
					'Digite o e-mail registrado para que possamos enviar o PIN para recuperar a sua senha.',
				input: 'Digite o seu e-mail',
				button: 'Enviar',
				successFeedback: 'E-mail enviado!',
				errorFeedback:
					'O e-mail não está registrado no nosso banco de dados',
			},
			step_2: {
				title: 'Digite o PIN',
				helpText:
					'Enviamos um número de 6 dígitos para o seu e-mail, digite-o abaixo para continuar o processo de recuperação de senha',
				button: 'Continuar',
				successFeedback: 'PIN validado',
				errorFeedback: 'O PIN digitado é inválido',
			},
			step_3: {
				title: 'Atualizar a senha',
				helpText:
					'Agora que finalizamos todos os passos, digite uma nova senha para a sua conta! =D',
				firstInput: 'Digite sua nova a senha',
				secondInput: 'Confirme a sua nova senha',
				button: 'Alterar',
				successFeedback: 'Senha alterada com sucesso!',
			},
		},

		favorites: {
			text1: 'Você ainda não favoritou nenhum livro',
			text2:
				'Acesse o menu principal e veja os livros disponíveis para compra',
			button: 'Recarregar lista de favoritos',
		},

		addressForm: {
			zipcode: 'CEP',
			neighborhood: 'Bairro',
			city: 'Cidade',
			state: 'Estado',
			street: 'Rua',
			secondaryButton: 'Cancelar',
			actionButton: 'Aplicar',
		},
	},
};

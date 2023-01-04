
import MessageBroker from '@integrations/rabbitmq.integration';
import skillService from '@/services/skills.service';
import DomainService from '@/services/domain.service';

export const initializeRabbitMq = () => {
    const skillservice = new skillService();
    const Domainservice = new DomainService();
    MessageBroker.getInstance()
        .then(broker => {
            broker.subscribe('test', (msg: { content: { toString: () => any; }; }, ack: () => void) => {
                console.log('Message:', msg.content.toString())
                ack()
            })

            broker.subscribe('create_domain', (msg: { content: any }, ack: () => void) => {
                console.log('Message:', msg.content.toString())
                Domainservice.createDomain(JSON.parse(msg.content));
                ack()
            })

            broker.subscribe('create_skill', (msg: { content: any }, ack: () => void) => {
                console.log('Message:', JSON.parse(msg.content))
                skillservice.createSkill(JSON.parse(msg.content)).then((res) => console.log(res));
                ack()
            })
            broker.subscribe('update_skill', (msg: { content: any }, ack: () => void) => {
                console.log('Message:', JSON.parse(msg.content))

                const data = JSON.parse(msg.content);

                skillservice.updateSkill(data.id, data.data).then((res) => console.log(res));
                ack()
            })
            broker.subscribe('delete_skill', (msg: { content: any }, ack: () => void) => {
                console.log('Message:', JSON.parse(msg.content))
                skillservice.deleteSkill(JSON.parse(msg.content)).then((res) => console.log(res));
                ack()
            })
        })
}